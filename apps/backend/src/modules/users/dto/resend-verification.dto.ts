import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '../entities/user.entity';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ResendVerificationLinkDto {
  @ApiProperty({
    example: 'john@example.com',
    default: 'john@example.com',
    description: 'Email address of the user',
  })
  @IsEmail()
  email: string;
}
