import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, Length, IsEnum } from "class-validator";
import { Gender } from "src/common/interfaces/common.interface";

export class UpdateProfileDto {
	@ApiProperty({ description: 'First name of the user', example: 'John' })
	@IsString()
	@IsOptional()
	@Length(2, 50)
	firstname?: string;
  
	@ApiProperty({ description: 'Last name of the user', example: 'Doe' })
	@IsString()
	@IsOptional()
	@Length(2, 50)
	lastname?: string;
  
	@ApiProperty({ enum: Gender, description: 'Gender of the user', example: 'Male' })
	@IsEnum(Gender)
	@IsOptional()
	gender?: Gender;
  
	@ApiProperty({ description: 'Address of the user', example: '123 Main St' })
	@IsString()
	@IsOptional()
	@Length(5, 100)
	address?: string;
  
	@ApiProperty({ description: 'Short description about the user', example: 'Software Developer' })
	@IsString()
	@IsOptional()
	@Length(0, 500)
	description?: string;
  }
  