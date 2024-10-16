import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobtestService } from './jobtest.service';
import { CreateJobtestDto } from './dto/create-jobtest.dto';
import { UpdateJobtestDto } from './dto/update-jobtest.dto';

@Controller('jobtest')
export class JobtestController {
  constructor(private readonly jobtestService: JobtestService) {}
}
