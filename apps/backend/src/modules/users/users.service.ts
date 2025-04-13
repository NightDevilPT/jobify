import { CommandBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { UserDocument } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/response-user.dto';
import { UserRepository } from './repository/user.repository';
import { CreateUserCommand } from './commands/impl/create-user.command';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly commandBus: CommandBus,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserDocument> {
    return this.commandBus.execute(new CreateUserCommand(dto));
  }

  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => {
      const userObject = user.toObject(); // Convert to plain object
      console.log(userObject, 'userObject'); // Log the user object for debugging
      const { password, ...userWithoutPassword } = userObject; // Exclude password
      return userWithoutPassword as UserResponseDto; // Return the user without password
    });
  }
}
