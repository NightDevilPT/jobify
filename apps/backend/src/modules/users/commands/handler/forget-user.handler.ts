import { CommandHandler } from '@nestjs/cqrs';
import { MailProvider } from 'src/services/mail/interface';
import { ErrorTypes } from 'src/interfaces/error.interface';
import { UserRepository } from '../../repository/user.repository';
import {
  ForgetPasswordUserResponseDto,
  VerifyUserResponseDto,
} from '../../dto/response-user.dto';
import { HashService } from 'src/services/hash-service/index.service';
import { TemplateEnum } from 'src/services/mail/helpers/template-generator';
import { HttpErrorService } from 'src/services/http-error-service/index.service';
import { ResendVerificationCommand } from '../impl/resend-verification.command';
import { MailSenderService } from 'src/services/mail/services/mail-sender.service';
import { ForgetPasswordCommand } from '../impl/forget-user.command';

@CommandHandler(ForgetPasswordCommand)
export class ForgetPasswordCommandHandler {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly httpErrorService: HttpErrorService,
    private readonly hashService: HashService,
    private readonly mailService: MailSenderService,
  ) {}

  async execute({
    payload,
  }: ForgetPasswordCommand): Promise<ForgetPasswordUserResponseDto> {
    const { email } = payload;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      this.httpErrorService.throwError(ErrorTypes.NotFound, 'User not found');
    }

    if (user?.isVerified) {
      this.httpErrorService.throwError(
        ErrorTypes.Conflict,
        'User is already verified',
      );
    }

    const expireTime = 60 * 60 * 24; // 24 hours
    const token = await this.hashService.hashValue(
      `${new Date().getTime() + expireTime}`,
    );
    const userWithToken = await this.userRepository.update(user?.id, {
      token: token,
    });

    if (!userWithToken) {
      this.httpErrorService.throwError(
        ErrorTypes.InternalServerError,
        'Failed to update user',
      );
    }

    const verificationUrl = `${process.env.ORIGIN}/auth/forget-password/${token}`;
    const emailSent = await this.mailService.sendMailTemplate({
      templateName: TemplateEnum.FORGET_PASSWORD,
      payload: {
        username: userWithToken.username,
        url: verificationUrl,
      },
      to: payload.email,
      subject: 'Reset Password',
      provider: MailProvider.GMAIL,
    });

    if (!emailSent) {
      this.httpErrorService.throwError(
        ErrorTypes.InternalServerError,
        'Failed to send verification email',
      );
    }
    return { message: 'Reset password link sent to your email' };
  }
}
