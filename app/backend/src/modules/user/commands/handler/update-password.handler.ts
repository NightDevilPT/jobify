// File: src/modules/user/commands/handler/update-password.handler.ts

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePasswordCommand } from '../impl/update-password.command';
import { ErrorService } from 'src/services/error/error.service';
import { UserRepository } from '../../repositories/user.repository';
import { HashService } from 'src/services/hash/hash.service';
import { LoggerService } from 'src/services/logger/logger.service';
import { BaseResponse } from 'src/common/interfaces/response';

@CommandHandler(UpdatePasswordCommand)
export class UpdatePasswordHandler implements ICommandHandler<UpdatePasswordCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly errorService: ErrorService,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setContext('UpdatePasswordHandler');
  }

  async execute(command: UpdatePasswordCommand): Promise<BaseResponse> {
    const { token, password } = command;

    this.loggerService.log(`Attempting to update password for user with token: ${token}`);

    // Find user by token
    const user = await this.userRepository.findByToken(token);
    if (!user) {
      this.loggerService.error(`Invalid token: ${token}`);
      throw this.errorService.throwUnauthorizedError('Invalid or expired token');
    }

    // Hash the new password
    const hashedPassword = await this.hashService.hashPassword(password);

    // Update user's password and clear the token
    user.password = hashedPassword;
    user.token = null; // Clear the token after successful password update

    await user.save();

    this.loggerService.log(`Password updated successfully for user: ${user.email}`);

    return { message: 'Password updated successfully' };
  }
}
