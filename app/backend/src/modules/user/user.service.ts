import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { BaseResponse } from 'src/common/interfaces/response';

@Injectable()
export class UserService {
  constructor(private readonly commandBus: CommandBus) {}

  async registerUser(createUserDto: CreateUserDto): Promise<BaseResponse> {
    const { username, email, password, userType } = createUserDto;
    return this.commandBus.execute(
      new CreateUserCommand(username, email, password, userType),
    );
  }
}
