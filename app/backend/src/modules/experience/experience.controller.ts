// File: src/modules/experience/experience.controller.ts
import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { ApiTags, ApiOperation, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { UserRequest } from 'src/common/interfaces/common.interface';
import { User } from 'src/common/decorator/jwt-payload.decorator';

@ApiTags('Experience')
@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Get()
  @ApiOperation({ summary: 'Get all experience records for a profile' })
  async getExperiencesByProfileId(@User() user: UserRequest) {
    return this.experienceService.getExperiencesByProfileId(user.userId);
  }

  @Post()
  @ApiConsumes('application/x-www-form-urlencoded', 'multipart/form-data')
  @ApiOperation({ summary: 'Create experience entry for a profile' })
  async createExperience(
    @Body() createExperienceDto: CreateExperienceDto,
    @User() user: UserRequest,
  ) {
    return this.experienceService.createExperience(createExperienceDto, user);
  }

  @Put(':experienceId')
  @ApiConsumes('application/x-www-form-urlencoded', 'multipart/form-data')
  @ApiOperation({ summary: 'Update an experience entry' })
  @ApiParam({
    name: 'experienceId',
    description: 'ID of the experience entry to update',
    type: String,
  })
  async updateExperience(
    @Body() updateExperienceDto: UpdateExperienceDto,
    @Param('experienceId') experienceId: Types.ObjectId,
    @User() user: UserRequest,
  ) {
    return this.experienceService.updateExperience(updateExperienceDto, user, experienceId);
  }

  @Delete(':experienceId')
  @ApiOperation({ summary: 'Delete an experience entry' })
  @ApiParam({
    name: 'experienceId',
    description: 'ID of the experience entry to delete',
    type: String,
  })
  async deleteExperience(
    @Param('experienceId') experienceId: Types.ObjectId,
    @User() user: UserRequest,
  ) {
    return this.experienceService.deleteExperience(experienceId, user);
  }
}
