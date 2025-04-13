// user-response.dto.ts
import { UserType } from '../entities/user.entity';
import { ApiResponseProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiResponseProperty({ example: 'john_doe', })
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
