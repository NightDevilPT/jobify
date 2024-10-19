import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VerifyUserCommand } from '../impl/verify-user.command';
import { BaseResponse } from 'src/common/interfaces/response';
import { UserRepository } from '../../repositories/user.repository';
import { ErrorService } from 'src/services/error/error.service';
import { LoggerService } from 'src/services/logger/logger.service';

@CommandHandler(VerifyUserCommand)
export class VerifyUserHandler implements ICommandHandler<VerifyUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly errorService: ErrorService,
    private readonly loggerService: LoggerService // Inject the LoggerService
  ) {
    this.loggerService.setContext('VerifyUserHandler'); // Set a default context for the logger
  }

  async execute(command: VerifyUserCommand): Promise<BaseResponse> {
    const { token } = command;

    // Log the token verification attempt
    this.loggerService.log(`Attempting to verify user with token: ${token}`);

    // Find user by token
    const user = await this.userRepository.findByToken(token);
    
    if (!user) {
      // Log the error before throwing it
      this.loggerService.error(`User not found for token: ${token}`);
      throw this.errorService.throwUnauthorizedError('Invalid Token');
    }

    // Log the successful user lookup
    this.loggerService.log(`User found for token: ${token}. Proceeding with verification.`);

    // Update user's isVerified to true and set token to null
    user.isVerified = true;
    user.token = null;
    
    await user.save();

    // Log the successful verification
    this.loggerService.log(`User with token: ${token} has been successfully verified.`);

    return { message: 'User verified successfully' };
  }
}
