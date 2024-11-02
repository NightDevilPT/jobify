// File: src/modules/experience/experience.service.ts
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { CreateExperienceCommand } from './commands/impl/create-experience.command';
import { UpdateExperienceCommand } from './commands/impl/update-experience.command';
import { DeleteExperienceCommand } from './commands/impl/delete-experience.command';
import { GetExperienceByProfileIdQuery } from './queries/impl/get-experience-by-profile-id.query';
import { Types } from 'mongoose';
import { UserRequest } from 'src/common/interfaces/common.interface';

@Injectable()
export class ExperienceService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createExperience(createExperienceDto: CreateExperienceDto, user: UserRequest) {
    return this.commandBus.execute(new CreateExperienceCommand(createExperienceDto, user));
  }

  async updateExperience(
    updateExperienceDto: UpdateExperienceDto,
    user: UserRequest,
    experienceId: Types.ObjectId,
  ) {
    return this.commandBus.execute(new UpdateExperienceCommand(updateExperienceDto, experienceId, user));
  }

  async deleteExperience(experienceId: Types.ObjectId, user: UserRequest) {
    return this.commandBus.execute(new DeleteExperienceCommand(experienceId, user));
  }

  async getExperiencesByProfileId(userId: Types.ObjectId) {
    return this.queryBus.execute(new GetExperienceByProfileIdQuery(userId));
  }
}
