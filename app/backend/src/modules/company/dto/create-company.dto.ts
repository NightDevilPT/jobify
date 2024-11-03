import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUrl, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCompanyDto {
  @ApiProperty({ description: 'Name of the company', example: 'Tech Corp' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Address of the company', example: '1234 Silicon Valley' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ description: 'Website of the company', example: 'https://www.techcorp.com' })
  @IsUrl()
  @IsOptional()
  website?: string;

  @ApiProperty({ description: 'Description of the company', example: 'Leading tech innovation' })
  @IsString()
  @IsOptional()
  description?: string;
}
