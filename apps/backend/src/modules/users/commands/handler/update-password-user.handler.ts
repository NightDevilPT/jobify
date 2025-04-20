import { CommandHandler } from '@nestjs/cqrs';
import { MailProvider } from 'src/services/mail/interface';
import { ErrorTypes } from 'src/interfaces/error.interface';
import { UserRepository } from '../../repository/user.repository';
import {
  UpdatePasswordUserResponseDto,
  VerifyUserResponseDto,
} from '../../dto/response-user.dto';
import { HashService } from 'src/services/hash-service/index.service';
import { TemplateEnum } from 'src/services/mail/helpers/template-generator';
import { HttpErrorService } from 'src/services/http-error-service/index.service';
import { ResendVerificationCommand } from '../impl/resend-verification.command';
import { MailSenderService } from 'src/services/mail/services/mail-sender.service';
import { UpdatePasswordCommand } from '../impl/update-password.command';

@CommandHandler(UpdatePasswordCommand)
export class UpdatePasswordCommandHandler {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly httpErrorService: HttpErrorService,
    private readonly hashService: HashService,
    private readonly mailService: MailSenderService,
  ) {}

  async execute({
    payload,
  }: UpdatePasswordCommand): Promise<UpdatePasswordUserResponseDto> {
    const { token, password } = payload;
	if(token.length<=0){
		this.httpErrorService.throwError(
			ErrorTypes.BadRequest,
			'Token is required',
		);
	}
    const user = await this.userRepository.findByField('token', token);

    if (!user) {
      this.httpErrorService.throwError(ErrorTypes.NotFound, 'User not found');
    }

    if (!user?.isVerified) {
      this.httpErrorService.throwError(
        ErrorTypes.Conflict,
        'User is not verified',
      );
    }

    const hashedPassword = await this.hashService.hashValue(password);
    const updatedUser = await this.userRepository.update(user._id, {
      password: hashedPassword,
	  token: ''
    });

    if (!updatedUser) {
      this.httpErrorService.throwError(
        ErrorTypes.InternalServerError,
        'Failed to update user',
      );
    }

    return { message: 'Password updated successfully' };
  }
}
