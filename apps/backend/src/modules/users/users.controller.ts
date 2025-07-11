import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ForgetPasswordUserResponseDto,
  LoginUserResponseDto,
  UpdatePasswordUserResponseDto,
  UserResponseDto,
  VerifyUserResponseDto,
} from './dto/response-user.dto';
import { User } from './entities/user.entity';
import {
  SwaggerEndpoint,
  SwaggerFormType,
} from 'src/common/decorators/swagger.decorator';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LinkDto } from './dto/resend-verification.dto';
import { LoginDto } from './dto/login-user.dto';
import { UpdatePasswordDto } from './dto/update-password-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // Post Request to create a new user
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
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.createUser(createUserDto);
  }

  // Post Request to resend verification email
  // This endpoint is used to resend the verification email to the user
  @Post('resend-verification')
  @SwaggerEndpoint({
    bodyType: LinkDto,
    summary: 'Resend verification email',
    description: 'Resends the verification email to the user',
    responseType: VerifyUserResponseDto,
    status: 200,
    errorResponses: [
      { status: 400, description: 'Validation failed or bad input' },
      { status: 500, description: 'Internal server error' },
    ],
  })
  async resendVerificationEmail(
    @Body() resendVerificationLinkDto: LinkDto,
  ): Promise<VerifyUserResponseDto> {
    return this.userService.resendVerificationEmail(resendVerificationLinkDto);
  }

  // Post Request to resend verification email
  // This endpoint is used to resend the verification email to the user
  @Post('forget-password')
  @SwaggerEndpoint({
    bodyType: LinkDto,
    summary: 'Forget password email',
    description: 'Forget password email to the user',
    responseType: ForgetPasswordUserResponseDto,
    status: 200,
    errorResponses: [
      { status: 400, description: 'Validation failed or bad input' },
      { status: 500, description: 'Internal server error' },
    ],
  })
  async forgetPassword(
    @Body() forgetPasswordPayload: LinkDto,
  ): Promise<ForgetPasswordUserResponseDto> {
    return this.userService.forgetPassword(forgetPasswordPayload);
  }


  @Post('update-password')
  @SwaggerEndpoint({
    bodyType: UpdatePasswordDto,
    summary: 'Forget password email',
    description: 'Forget password email to the user',
    responseType: ForgetPasswordUserResponseDto,
    status: 200,
    errorResponses: [
      { status: 400, description: 'Validation failed or bad input' },
      { status: 500, description: 'Internal server error' },
    ],
  })
  async updatePassword(
    @Body() updatePasswordPayload: UpdatePasswordDto,
  ): Promise<UpdatePasswordUserResponseDto> {
    return this.userService.updatePassword(updatePasswordPayload);
  }


  // Get Request to verify a user
  // This endpoint is used to verify a user with the provided token
  @Get('verify/:token')
  @SwaggerEndpoint({
    summary: 'Verify a user',
    description: 'Verifies a user with the provided token',
    responseType: VerifyUserResponseDto,
    status: 200,
    errorResponses: [
      { status: 400, description: 'Invalid or expired token' },
      { status: 500, description: 'Internal server error' },
    ],
    params: {
      token: {
        description: 'The verification token sent to the user',
        type: 'string',
      },
    },
  })
  async verifyUser(
    @Param('token') token: string,
  ): Promise<VerifyUserResponseDto> {
    return this.userService.verifyUser(token);
  }

  // Login Request to login a user
  // This endpoint is used to login a user with the provided credentials
  @Post('login')
  @SwaggerEndpoint({
    bodyType: LoginDto,
    summary: 'Login a user',
    description: 'Logs in a user with the provided credentials',
    responseType: LoginUserResponseDto,
    status: 200,
    errorResponses: [
      { status: 400, description: 'Invalid credentials' },
      { status: 500, description: 'Internal server error' },
    ],
  })
  async loginUser(@Body() loginDto: LoginDto): Promise<LoginUserResponseDto> {
    return this.userService.loginUser(loginDto);
  }
}
