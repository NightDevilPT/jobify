import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestquestionService } from './testquestion.service';
import { CreateTestquestionDto } from './dto/create-testquestion.dto';
import { UpdateTestquestionDto } from './dto/update-testquestion.dto';

@Controller('testquestion')
export class TestquestionController {
  constructor(private readonly testquestionService: TestquestionService) {}
}
