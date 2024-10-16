import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}
}
