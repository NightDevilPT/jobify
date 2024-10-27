import { Body, Controller, Post, Put, Delete, Param } from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { ApiTags, ApiOperation, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { UserRequest } from 'src/common/interfaces/common.interface';
import { User } from 'src/common/decorator/jwt-payload.decorator';

@ApiTags('Education')
@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  @ApiConsumes('application/x-www-form-urlencoded', 'multipart/form-data')
  @ApiOperation({ summary: 'Create education entry for a profile' })
  async createEducation(
    @Body() createEducationDto: CreateEducationDto,
    @User() user: UserRequest,
  ) {
    return this.educationService.createEducation(createEducationDto, user);
  }

  @Put(':educationId')
  @ApiConsumes('application/x-www-form-urlencoded', 'multipart/form-data')
  @ApiOperation({ summary: 'Update an education entry' })
  @ApiParam({
    name: 'educationId',
    description: 'ID of the education entry to update',
    type: String,
  })
  async updateEducation(
    @Body() updateEducationDto: UpdateEducationDto,
    @Param('educationId') educationId: Types.ObjectId,
    @User() user: UserRequest,
  ) {
    return this.educationService.updateEducation(
      updateEducationDto,
      user,
      educationId
    );
  }

  @Delete(':educationId')
  @ApiOperation({ summary: 'Delete an education entry' })
  @ApiParam({
    name: 'educationId',
    description: 'ID of the education entry to delete',
    type: String,
  })
  async deleteEducation(
    @Param('educationId') educationId: Types.ObjectId,
    @User() user: UserRequest,
  ) {
    return this.educationService.deleteEducation(educationId,user);
  }
}
