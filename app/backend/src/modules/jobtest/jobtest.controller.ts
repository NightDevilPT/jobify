import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobtestService } from './jobtest.service';
import { CreateJobtestDto } from './dto/create-jobtest.dto';
import { UpdateJobtestDto } from './dto/update-jobtest.dto';

@Controller('jobtest')
export class JobtestController {
  constructor(private readonly jobtestService: JobtestService) {}

  @Post()
  create(@Body() createJobtestDto: CreateJobtestDto) {
    return this.jobtestService.create(createJobtestDto);
  }

  @Get()
  findAll() {
    return this.jobtestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobtestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobtestDto: UpdateJobtestDto) {
    return this.jobtestService.update(+id, updateJobtestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobtestService.remove(+id);
  }
}
