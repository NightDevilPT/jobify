import { Body, Controller, Get, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BaseResponse } from 'src/common/interfaces/response';
import { LoginUserDto } from './dto/login-user.dto';
import { SetCookieInterceptor } from 'src/common/middleware/set-cookie/set-cookie.interceptor';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('verify')
  @ApiResponse({ status: 200, description: 'User verified successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async verify(@Query('token') token: string): Promise<BaseResponse> {
    return this.userService.verifyUser(token);
  }

  @Post('register')
  @ApiConsumes('application/x-www-form-urlencoded', 'multipart/form-data')
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async register(@Body() createUserDto: CreateUserDto): Promise<BaseResponse> {
    return this.userService.registerUser(createUserDto);
  }

  @Post('login')
  @ApiConsumes('application/x-www-form-urlencoded', 'multipart/form-data')
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Invalid email or password' })
  @UseInterceptors(SetCookieInterceptor) // Apply the interceptor to the login route
  async login(@Body() loginUserDto: LoginUserDto): Promise<BaseResponse> {
    return this.userService.loginUser(loginUserDto);
  }

  @Post('forgot-password')
  @ApiConsumes('application/x-www-form-urlencoded', 'multipart/form-data')
  @ApiResponse({ status: 200, description: 'Forgot password request processed' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<BaseResponse> {
    return this.userService.forgotPassword(forgotPasswordDto);
  }

  @Post('update-password')
  @ApiConsumes('application/x-www-form-urlencoded', 'multipart/form-data')
  @ApiResponse({ status: 200, description: 'Password updated successfully' })
  @ApiResponse({ status: 401, description: 'Invalid or expired token' })
  async updatePassword(
    @Query('token') token: string, // Token will be passed in the query string
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<BaseResponse> {
    return this.userService.updatePassword(token, updatePasswordDto);
  }
}
