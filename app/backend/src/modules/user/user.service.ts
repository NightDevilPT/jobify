import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { BaseResponse } from 'src/common/interfaces/response';
import { VerifyUserCommand } from './commands/impl/verify-user.command';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserCommand } from './commands/impl/login-user.command';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ForgotPasswordCommand } from './commands/impl/forgot-password.command';
import { UpdatePasswordCommand } from './commands/impl/update-password.command';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(private readonly commandBus: CommandBus) {}

  async registerUser(createUserDto: CreateUserDto): Promise<BaseResponse> {
    const { username, email, password, userType } = createUserDto;
    return this.commandBus.execute(
      new CreateUserCommand(username, email, password, userType),
    );
  }

  async verifyUser(token: string): Promise<BaseResponse> {
    return this.commandBus.execute(new VerifyUserCommand(token));
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<BaseResponse> {
    const { email, password } = loginUserDto;
    console.log(email,password,'@#@#@#')
    return this.commandBus.execute(new LoginUserCommand(email, password));
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<BaseResponse> {
    const { email } = forgotPasswordDto;
    return this.commandBus.execute(new ForgotPasswordCommand(email));
  }

  async updatePassword(token: string, updatePasswordDto: UpdatePasswordDto): Promise<BaseResponse> {
    const { password } = updatePasswordDto;
    return this.commandBus.execute(new UpdatePasswordCommand(token, password));
  }
}
