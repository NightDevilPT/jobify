import { CreateUserHandler } from './handler/create-user.handler';
import { VerifyUserCommandHandler } from './handler/verify-user.handler';

export const CommandHandlers = [CreateUserHandler, VerifyUserCommandHandler];
