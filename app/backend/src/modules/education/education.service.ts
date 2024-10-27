import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateEducationCommand } from './commands/impl/create-education.command';
import { UpdateEducationCommand } from './commands/impl/update-education.command';
import { DeleteEducationCommand } from './commands/impl/delete-education.command';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { Types } from 'mongoose';
import { UserRequest } from 'src/common/interfaces/common.interface';

@Injectable()
export class EducationService {
  constructor(private readonly commandBus: CommandBus) {}

  async createEducation(createEducationDto: CreateEducationDto, user:UserRequest) {
    return this.commandBus.execute(new CreateEducationCommand(createEducationDto, user));
  }

  async updateEducation(updateEducationDto: UpdateEducationDto, user: UserRequest,educationId:Types.ObjectId) {
    return this.commandBus.execute(new UpdateEducationCommand(updateEducationDto,educationId, user));
  }

  async deleteEducation(educationId: Types.ObjectId,user:UserRequest) {
    return this.commandBus.execute(new DeleteEducationCommand(educationId,user));
  }
}
