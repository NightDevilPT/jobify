import { LoginDto } from '../../dto/login-user.dto';

export class LoginUserCommand {
  constructor(public readonly payload: LoginDto) {}
}
