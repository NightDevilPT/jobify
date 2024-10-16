import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../impl/create-user.command';
import { ErrorService } from 'src/services/error/error.service';
import { UserRepository } from '../../repositories/user.repository';
import { BaseResponse } from 'src/common/interfaces/response';
import { LoggerService } from 'src/services/logger/logger.service';
import { HashService } from 'src/services/hash/hash.service';
import { MailService } from 'src/services/mail/mail.service';
import { ConfigService } from '@nestjs/config';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly errorService: ErrorService,
    private readonly hashService: HashService,
    private readonly loggerService: LoggerService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService, // Inject MailService
  ) {
    this.loggerService.setContext('CreateUserHandler');
  }

  async execute(command: CreateUserCommand): Promise<BaseResponse> {
    const { username, email, password, userType } = command;
    this.loggerService.log(`Executing CreateUserCommand with email: ${email}`);

    // Check if user already exists using the findByEmail method
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      this.loggerService.warn(`User already exists with email: ${email}`);
      throw this.errorService.throwConflictError('User already exists');
    }

    const [hashToken, hashPassword] = await Promise.all([
      this.hashService.hashPassword(`${new Date().toLocaleDateString()}-${email}`),
      this.hashService.hashPassword(password),
    ]);

    // Use the repository to create a new user
    const newUser = await this.userRepository.create({
      username,
      email,
      password: hashPassword,
      userType,
      isVerified: false,
      token: hashToken,
    });

    this.loggerService.log(`User successfully created with email: ${email}`);

    // Generate verification URL
    const verificationUrl = `${this.configService.get<string>("ORIGIN")}/auth/verify?token=${hashToken}`;

    // Send verification email
    await this.mailService.sendVerificationEmail(email, username, verificationUrl);

    this.loggerService.log(`Verification email sent to: ${email}`);

    return { message: `User successfully created. Verification link sent to ${email}.` };
  }
}
