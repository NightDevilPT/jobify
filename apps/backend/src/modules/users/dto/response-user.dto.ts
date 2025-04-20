// user-response.dto.ts
import { UserType } from '../entities/user.entity';
import { ApiResponseProperty, PartialType } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiResponseProperty({ example: 'john_doe' })
  username: string;

  @ApiResponseProperty({
    example: 'john@example.com',
  })
  email: string;

  @ApiResponseProperty({
    example: 'jwt_token_string',
  })
  token?: string;

  @ApiResponseProperty({
    example: true,
  })
  isVerified: boolean;

  @ApiResponseProperty({
    example: UserType.CANDIDATE,
    enum: UserType,
  })
  userType: UserType;

  @ApiResponseProperty({
    example: false,
  })
  isAdmin: boolean;

  // Add other properties as needed, excluding the password
}

export class VerifyUserResponseDto extends PartialType(UserResponseDto) {
  @ApiResponseProperty({
    example: 'User successfully verified',
  })
  message: string;
}

export class ForgetPasswordUserResponseDto extends PartialType(
  UserResponseDto,
) {
  @ApiResponseProperty({
    example: 'User successfully verified',
  })
  message: string;
}

export class UpdatePasswordUserResponseDto extends PartialType(
  UserResponseDto,
) {
  @ApiResponseProperty({
    example: 'Password updated successfully',
  })
  message: string;
}

export class LoginUserResponseDto extends PartialType(UserResponseDto) {
  @ApiResponseProperty({
    example: 'Login successful',
  })
  message: string;

  @ApiResponseProperty({
    example: 'access_token_string',
  })
  accessToken: string;

  @ApiResponseProperty({
    example: 'refresh_token_string',
  })
  refreshToken: string;
}
