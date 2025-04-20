import { CommandHandler } from '@nestjs/cqrs';
import { MailProvider } from 'src/services/mail/interface';
import { ErrorTypes } from 'src/interfaces/error.interface';
import { UserRepository } from '../../repository/user.repository';
import { VerifyUserResponseDto } from '../../dto/response-user.dto';
import { HashService } from 'src/services/hash-service/index.service';
import { TemplateEnum } from 'src/services/mail/helpers/template-generator';
import { HttpErrorService } from 'src/services/http-error-service/index.service';
import { ResendVerificationCommand } from '../impl/resend-verification.command';
import { MailSenderService } from 'src/services/mail/services/mail-sender.service';

@CommandHandler(ResendVerificationCommand)
export class ResendVerificationCommandHandler {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly httpErrorService: HttpErrorService,
    private readonly hashService: HashService,
    private readonly mailService: MailSenderService,
  ) {}

  async execute({
    payload,
  }: ResendVerificationCommand): Promise<VerifyUserResponseDto> {
    const user = await this.userRepository.findByEmail(payload.email);

    if (!user) {
      this.throwError(ErrorTypes.NotFound, 'User not found');
    }

    if (user.isVerified) {
      this.throwError(ErrorTypes.Conflict, 'User already verified');
    }

    const expireTime = 60 * 60 * 24; // 24 hours
    const token = await this.hashService.hashValue(
      `${new Date().getTime() + expireTime}`,
    );

    const updatedUser = await this.userRepository.update(user._id, { token });
    if (!updatedUser) {
      this.throwError(ErrorTypes.InternalServerError, 'Failed to update user');
    }

    const verificationUrl = `${process.env.ORIGIN}/auth/verify/${token}`;

    const emailSent = await this.mailService.sendMailTemplate({
      templateName: TemplateEnum.VERIFY_EMAIL,
      payload: {
        username: updatedUser.username,
        url: verificationUrl,
      },
      to: payload.email,
      subject: 'Welcome to Our Service',
      provider: MailProvider.GMAIL,
    });

    if (!emailSent) {
      this.throwError(
        ErrorTypes.InternalServerError,
        'Failed to send verification email',
      );
    }

    return { message: 'Verification email resent successfully' };
  }

  private throwError(type: ErrorTypes, message: string): never {
    throw this.httpErrorService.throwError(type, message);
  }
}
