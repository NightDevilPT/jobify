import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BaseResponse } from 'src/common/interfaces/response';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiConsumes('application/x-www-form-urlencoded', 'multipart/form-data')
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async register(@Body() createUserDto: CreateUserDto): Promise<BaseResponse> {
    return this.userService.registerUser(createUserDto);
  }
}
