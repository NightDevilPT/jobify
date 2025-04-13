import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/response-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { SwaggerEndpoint, SwaggerFormType } from 'src/common/decorators/swagger.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @SwaggerEndpoint({
    summary: 'Create a new user',
    description: 'Registers a new user in the system',
    responseType: User,
    status: 201,
    errorResponses: [
      { status: 400, description: 'Validation failed or bad input' },
      { status: 500, description: 'Internal server error' },
    ],
    bodyType: CreateUserDto,
    consumes: SwaggerFormType.JSON,
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @SwaggerEndpoint({
    summary: 'Get all users',
    description: 'Retrieves a list of all users in the system',
    responseType: [UserResponseDto], // Assuming you want to return an array of User
    status: 200,
    errorResponses: [
      { status: 500, description: 'Internal server error' },
    ],
  })
  async getAllUsers(): Promise<UserResponseDto[]> {
    return this.userService.getAllUsers();
  }
}
