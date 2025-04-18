import { CommandBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { UserDocument } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repository/user.repository';
import {
  LoginUserResponseDto,
  VerifyUserResponseDto,
} from './dto/response-user.dto';
import { ResendVerificationLinkDto } from './dto/resend-verification.dto';
import { VerifyUserCommand } from './commands/impl/verify-user.command';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { ResendVerificationCommand } from './commands/impl/resend-verification.command';
import { LoginDto } from './dto/login-user.dto';
import { LoginUserCommand } from './commands/impl/login-user.command';

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
    payload: ResendVerificationLinkDto,
  ): Promise<VerifyUserResponseDto> {
    return this.commandBus.execute(new ResendVerificationCommand(payload));
  }

  async loginUser(payload: LoginDto): Promise<LoginUserResponseDto> {
    return this.commandBus.execute(new LoginUserCommand(payload));
  }
}
