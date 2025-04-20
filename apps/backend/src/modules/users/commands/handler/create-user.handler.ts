import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { MailProvider } from 'src/services/mail/interface';
import { ErrorTypes } from 'src/interfaces/error.interface';
import { UserResponseDto } from '../../dto/response-user.dto';
import { UserRepository } from '../../repository/user.repository';
import { CreateUserCommand } from '../impl/create-user.command';
import { HashService } from 'src/services/hash-service/index.service';
import { TemplateEnum } from 'src/services/mail/helpers/template-generator';
import { HttpErrorService } from 'src/services/http-error-service/index.service';
import { MailSenderService } from 'src/services/mail/services/mail-sender.service';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly httpErrorService: HttpErrorService,
    private readonly mailService: MailSenderService,
    private readonly configService: ConfigService
  ) {}

  async execute({
    payload,
  }: CreateUserCommand): Promise<UserResponseDto | undefined> {
    const { username, email, password, userType } = payload;

    try {
      // Check if user already exists
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        this.httpErrorService.throwError(
          ErrorTypes.BadRequest,
          'User already exists with this email',
        );
      }

      // Hash password and generate token
      const hashedPassword = await this.hashService.hashValue(password);
      const token = await this.hashService.hashValue(`${new Date().getTime()}`);

      // Create new user
      const newUser = await this.userRepository.create({
        username,
        email,
        password: hashedPassword,
        userType,
        token,
      });

      if (newUser) {
        // Generate the verification URL (or whatever URL is appropriate for your case)
        const verificationUrl = `${process.env.ORIGIN}/auth/verify?token=${token}`;

        // Send welcome email with template
        const d = await this.mailService.sendMailTemplate({
          templateName: TemplateEnum.VERIFY_EMAIL, // Using the 'verify-email' template
          payload: {
            username: newUser.username,
            url: verificationUrl,
          },
          to: email,
          subject: 'Welcome to Our Service',
          provider: MailProvider.GMAIL,
        });
      }

      return newUser;
    } catch (error) {
      console.log(error, 'error');
      // Handle unexpected errors and throw InternalServerError
      this.httpErrorService.throwError(
        ErrorTypes.InternalServerError,
        `User Creation Failed: ${error?.message || error}`,
      );
    }
  }
}
