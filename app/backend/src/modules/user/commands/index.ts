import { CreateUserHandler } from './handler/create-user.handler';
import { LoginUserHandler } from './handler/login-user.handler';
import { VerifyUserHandler } from './handler/verify-user.handler';

export const UserCommandHandlers = [
  CreateUserHandler,
  VerifyUserHandler,
  LoginUserHandler,
];
