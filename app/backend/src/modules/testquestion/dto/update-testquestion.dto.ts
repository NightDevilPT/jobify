import { PartialType } from '@nestjs/mapped-types';
import { CreateTestquestionDto } from './create-testquestion.dto';

export class UpdateTestquestionDto extends PartialType(CreateTestquestionDto) {}
