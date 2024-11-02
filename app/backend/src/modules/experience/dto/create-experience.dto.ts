import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsBoolean, IsDate, IsArray, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreateExperienceDto {
  @ApiProperty({ description: 'Job title or role', example: 'Software Engineer' })
  @IsString()
  readonly title: string;

  @ApiProperty({ description: 'Company where the experience was gained', example: 'Tech Corp' })
  @IsString()
  readonly company: string;

  @ApiProperty({ description: 'Location of the job or experience', example: 'New York, NY' })
  @IsString()
  @IsOptional()
  readonly location?: string;

  @ApiProperty({ description: 'Start date of the job or experience', example: '2021-06-01' })
  @IsDate()
  readonly startDate: Date;

  @ApiProperty({ description: 'End date of the job or experience', example: '2022-06-01' })
  @IsDate()
  @IsOptional()
  readonly endDate?: Date;

  @ApiProperty({ description: 'Whether the experience is current', default: false, example: false })
  @IsBoolean()
  @IsOptional()
  readonly isCurrent?: boolean;

  @ApiProperty({ description: 'Description of responsibilities and duties', example: 'Developed web applications.' })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiProperty({
    description: 'Technologies used during the experience',
    example: ['Node.js', 'React'],
    isArray: true,
    type: String,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => {
    // If value is a single string with commas, split into an array
    if (typeof value === 'string') {
      return value.split(',').map((tech) => tech.trim());
    }
    // If value is already an array, return it as-is
    if (Array.isArray(value)) {
      return value.map((tech) => tech.trim());
    }
    return [];
  })
  readonly technologies?: string[];

  @ApiProperty({ description: 'Associated profile for this Experience record', type: String })
  @IsMongoId()
  readonly profile: Types.ObjectId;
}
