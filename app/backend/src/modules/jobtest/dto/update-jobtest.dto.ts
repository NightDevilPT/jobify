import { PartialType } from '@nestjs/mapped-types';
import { CreateJobtestDto } from './create-jobtest.dto';

export class UpdateJobtestDto extends PartialType(CreateJobtestDto) {}
