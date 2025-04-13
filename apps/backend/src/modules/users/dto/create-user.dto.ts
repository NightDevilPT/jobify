import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '../entities/user.entity';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'john_doe',
    default: 'johndoe123',
    description: 'Unique username of the user',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'john@example.com',
    default: 'john@example.com',
    description: 'Email address of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'strongPassword123',
    default: 'strongPassword123',
    description: 'Password for the user (minimum 6 characters)',
    minLength: 6,
  })
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: UserType.CANDIDATE,
    enum: UserType,
    default: UserType.CANDIDATE,
    description: 'Type of user - Candidate or Recruiter',
  })
  @IsNotEmpty()
  userType: UserType;
}
