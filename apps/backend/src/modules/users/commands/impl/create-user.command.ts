import { CreateUserDto } from '../../dto/create-user.dto';

// create-user.command.ts
export class CreateUserCommand {
  constructor(public readonly payload: CreateUserDto) {}
}
