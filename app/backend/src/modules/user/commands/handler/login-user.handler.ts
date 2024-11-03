import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginUserCommand } from '../impl/login-user.command';
import { ErrorService } from 'src/services/error/error.service';
import { HashService } from 'src/services/hash/hash.service';
import { UserRepository } from '../../repositories/user.repository';
import { JwtService } from 'src/services/jwt/jwt.service';
import { LoggerService } from 'src/services/logger/logger.service'; // Import the LoggerService

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    private readonly errorService: ErrorService,
    private readonly loggerService: LoggerService, // Inject the LoggerService
  ) {
    this.loggerService.setContext('LoginUserHandler'); // Set default logging context for the handler
  }

  async execute(command: LoginUserCommand): Promise<{ token: string }> {
    const { email, password } = command;

    // Log the start of the login process
    this.loggerService.log(`Login attempt for email: ${email}`);

    // Find user by email
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      // Log the error before throwing it
      this.loggerService.error(`User not found for email: ${email}`);
      this.errorService.throwNotFoundError('User not found');
    }

    if (!user.isVerified) {
      this.loggerService.error(`User email not verified: ${user.email}`);
      this.errorService.throwUnauthorizedError('User email is not verified');
    }

    // Verify the password using HashService
    const isPasswordValid = await this.hashService.verifyPassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      // Log the password mismatch
      this.loggerService.warn(`Invalid password attempt for email: ${email}`);
      this.errorService.throwUnauthorizedError('Invalid email or password');
    }

    // Generate JWT token using JwtService
    const token = await this.jwtService.signToken({
      userId: user._id,
      email: user.email,
      role: user.userType,
    });

    // Log successful login and token generation
    this.loggerService.log(
      `User ${email} logged in successfully. JWT token generated.`,
    );

    return { token };
  }
}
