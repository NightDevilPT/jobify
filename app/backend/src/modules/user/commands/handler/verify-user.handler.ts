import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VerifyUserCommand } from '../impl/verify-user.command';
import { BaseResponse } from 'src/common/interfaces/response';
import { UserRepository } from '../../repositories/user.repository';
import { ErrorService } from 'src/services/error/error.service';

@CommandHandler(VerifyUserCommand)
export class VerifyUserHandler implements ICommandHandler<VerifyUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly errorService: ErrorService
  ) {}

  async execute(command: VerifyUserCommand): Promise<BaseResponse> {
    const { token } = command;

    // Find user by token
    const user = await this.userRepository.findByToken(token);
    
    if (!user) {
      // Throw error if user not found
      throw this.errorService.throwUnauthorizedError('Invalid Token');
    }

    // Update user's isVerified to true and set token to null
    user.isVerified = true;
    user.token = null;
    
    await user.save();

    return { message: 'User verified successfully' };
  }
}
