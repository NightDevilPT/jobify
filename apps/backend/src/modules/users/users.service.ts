import { CommandBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { UserDocument } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repository/user.repository';
import {
  ForgetPasswordUserResponseDto,
  LoginUserResponseDto,
  UpdatePasswordUserResponseDto,
  VerifyUserResponseDto,
} from './dto/response-user.dto';
import { LinkDto } from './dto/resend-verification.dto';
import { VerifyUserCommand } from './commands/impl/verify-user.command';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { ResendVerificationCommand } from './commands/impl/resend-verification.command';
import { LoginDto } from './dto/login-user.dto';
import { LoginUserCommand } from './commands/impl/login-user.command';
import { ForgetPasswordCommand } from './commands/impl/forget-user.command';
import { UpdatePasswordDto } from './dto/update-password-user.dto';
import { UpdatePasswordCommandHandler } from './commands/handler/update-password-user.handler';
import { UpdatePasswordCommand } from './commands/impl/update-password.command';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly commandBus: CommandBus,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserDocument> {
    return this.commandBus.execute(new CreateUserCommand(dto));
  }

  async verifyUser(token: string): Promise<VerifyUserResponseDto> {
    return this.commandBus.execute(new VerifyUserCommand(token));
  }

  async resendVerificationEmail(
    payload: LinkDto,
  ): Promise<VerifyUserResponseDto> {
    return this.commandBus.execute(new ResendVerificationCommand(payload));
  }

  async forgetPassword(
    payload: LinkDto,
  ): Promise<ForgetPasswordUserResponseDto> {
    return this.commandBus.execute(new ForgetPasswordCommand(payload));
  }

  async updatePassword(
    payload: UpdatePasswordDto,
  ): Promise<UpdatePasswordUserResponseDto> {
    return this.commandBus.execute(new UpdatePasswordCommand(payload));
  }

  async loginUser(payload: LoginDto): Promise<LoginUserResponseDto> {
    return this.commandBus.execute(new LoginUserCommand(payload));
  }
}
