import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
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
}
