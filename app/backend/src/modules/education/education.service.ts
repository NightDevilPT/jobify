import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateEducationCommand } from './commands/impl/create-education.command';
import { UpdateEducationCommand } from './commands/impl/update-education.command';
import { DeleteEducationCommand } from './commands/impl/delete-education.command';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { Types } from 'mongoose';
import { UserRequest } from 'src/common/interfaces/common.interface';
import { GetEducationsByProfileIdQuery } from './queries/impl/get-educations-by-profile-id.query';

@Injectable()
export class EducationService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createEducation(
    createEducationDto: CreateEducationDto,
    user: UserRequest,
  ) {
    return this.commandBus.execute(
      new CreateEducationCommand(createEducationDto, user),
    );
  }

  async updateEducation(
    updateEducationDto: UpdateEducationDto,
    user: UserRequest,
    educationId: Types.ObjectId,
  ) {
    return this.commandBus.execute(
      new UpdateEducationCommand(updateEducationDto, educationId, user),
    );
  }

  async deleteEducation(educationId: Types.ObjectId, user: UserRequest) {
    return this.commandBus.execute(
      new DeleteEducationCommand(educationId, user),
    );
  }

  async getEducationsByProfileId(userId: Types.ObjectId) {
    return this.queryBus.execute(new GetEducationsByProfileIdQuery(userId));
  }
}
