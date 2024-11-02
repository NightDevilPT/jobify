// Path: backend/src/modules/profile/dto/create-profile.dto.ts

import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from 'src/common/interfaces/common.interface'; // Assuming Gender is an enum

export class CreateProfileDto {
  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  firstname: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  lastname: string;

  @ApiProperty({
    description: 'Gender of the user',
    enum: Gender
  })
  @IsEnum(Gender, { message: 'Invalid gender provided' })
  @IsNotEmpty({ message: 'Gender is required' })
  gender: Gender;

  @ApiProperty({
    description: 'Address of the user',
    example: '123 Main St, Springfield',
    required: false,
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    description: 'Description or bio of the user',
    example: 'A software engineer with 10 years of experience',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
