import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '../entities/user.entity';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UpdatePasswordDto {
	@ApiProperty({
		description: 'Current password',
		example: 'password123',
	})
	@IsNotEmpty()
	password: string;

	@ApiProperty({
		description: 'Token for password reset',
		example: 'token',
	})
	@IsNotEmpty()
	token: string;
}
