import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestquestionService } from './testquestion.service';
import { CreateTestquestionDto } from './dto/create-testquestion.dto';
import { UpdateTestquestionDto } from './dto/update-testquestion.dto';

@Controller('testquestion')
export class TestquestionController {
  constructor(private readonly testquestionService: TestquestionService) {}

  @Post()
  create(@Body() createTestquestionDto: CreateTestquestionDto) {
    return this.testquestionService.create(createTestquestionDto);
  }

  @Get()
  findAll() {
    return this.testquestionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testquestionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestquestionDto: UpdateTestquestionDto) {
    return this.testquestionService.update(+id, updateTestquestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testquestionService.remove(+id);
  }
}
