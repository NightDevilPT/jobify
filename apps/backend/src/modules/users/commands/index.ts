import { CreateUserHandler } from './handler/create-user.handler';
import { ForgetPasswordCommandHandler } from './handler/forget-user.handler';
import { LoginUserHandler } from './handler/login-user.handler';
import { ResendVerificationCommandHandler } from './handler/resend-verification.handler';
import { UpdatePasswordCommandHandler } from './handler/update-password-user.handler';
import { VerifyUserCommandHandler } from './handler/verify-user.handler';

export const CommandHandlers = [
  CreateUserHandler,
  VerifyUserCommandHandler,
  ResendVerificationCommandHandler,
  LoginUserHandler,
  ForgetPasswordCommandHandler,
  UpdatePasswordCommandHandler
];
