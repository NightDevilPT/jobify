// File: src/modules/user/commands/handler/forgot-password.handler.ts

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ForgotPasswordCommand } from '../impl/forgot-password.command';
import { ErrorService } from 'src/services/error/error.service';
import { UserRepository } from '../../repositories/user.repository';
import { HashService } from 'src/services/hash/hash.service';
import { LoggerService } from 'src/services/logger/logger.service';
import { MailService } from 'src/services/mail/mail.service';
import { BaseResponse } from 'src/common/interfaces/response';

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordHandler implements ICommandHandler<ForgotPasswordCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly errorService: ErrorService,
    private readonly hashService: HashService,
    private readonly loggerService: LoggerService,
    private readonly mailService: MailService,
  ) {
    this.loggerService.setContext('ForgotPasswordHandler');
  }

  async execute(command: ForgotPasswordCommand): Promise<BaseResponse> {
    const { email } = command;
    this.loggerService.log(`Processing forgot password request for email: ${email}`);

    // Check if user exists by email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      this.loggerService.warn(`User not found for email: ${email}`);
      throw this.errorService.throwNotFoundError('User not found');
    }

    // Generate a reset token
    const resetToken = await this.hashService.hashPassword(`${new Date().toLocaleDateString()}-${email}`);

    // Update user token
    user.token = resetToken;
    await user.save();

    this.loggerService.log(`Reset token generated for user: ${email}`);

    // Send reset password email
    const resetUrl = `${process.env.ORIGIN}/auth/reset-password?token=${resetToken}`;
    await this.mailService.sendResetPasswordEmail(email, resetUrl);

    this.loggerService.log(`Reset password email sent to: ${email}`);

    return { message: `Forgot password request sent to ${email}.` };
  }
}
