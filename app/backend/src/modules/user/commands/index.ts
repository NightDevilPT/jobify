import { CreateUserHandler } from './handler/create-user.handler';
import { ForgotPasswordHandler } from './handler/forgot-password.handler';
import { LoginUserHandler } from './handler/login-user.handler';
import { UpdatePasswordHandler } from './handler/update-password.handler';
import { VerifyUserHandler } from './handler/verify-user.handler';

export const UserCommandHandlers = [
  CreateUserHandler,
  VerifyUserHandler,
  LoginUserHandler,
  ForgotPasswordHandler,
  UpdatePasswordHandler
];
