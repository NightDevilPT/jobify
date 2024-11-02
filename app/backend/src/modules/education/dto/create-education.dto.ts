import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsEnum, IsOptional } from 'class-validator';
import { DegreeEnum, IndustryEnum } from 'src/common/interfaces/common.interface';

export class CreateEducationDto {
  @ApiProperty({ description: 'Degree type (e.g., Bachelors, Masters)',enum:DegreeEnum })
  @IsEnum(DegreeEnum)
  degree: DegreeEnum;

  @ApiProperty({ description: 'Institution where the degree was obtained',enum:IndustryEnum })
  @IsEnum(IndustryEnum)
  institution: IndustryEnum;

  @ApiProperty({ description: 'Start date of the education',type:Date })
  @IsDate()
  startDate: Date;

  @ApiProperty({ description: 'End date of the education' })
  @IsDate()
  @IsOptional()
  endDate?: Date;

  @ApiProperty({ description: 'Whether the education is ongoing' })
  @IsOptional()
  isCurrent?: boolean;
}
