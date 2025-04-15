import { CreateUserHandler } from './handler/create-user.handler';
import { ResendVerificationCommandHandler } from './handler/resend-verification.handler';
import { VerifyUserCommandHandler } from './handler/verify-user.handler';

export const CommandHandlers = [
  CreateUserHandler,
  VerifyUserCommandHandler,
  ResendVerificationCommandHandler,
];
