// File: src/modules/experience/commands/impl/create-experience.command.ts
import { Types } from 'mongoose';
import { CreateExperienceDto } from '../../dto/create-experience.dto';
import { UserRequest } from 'src/common/interfaces/common.interface';

export class CreateExperienceCommand {
  constructor(
    public readonly createExperienceDto: CreateExperienceDto,
    public readonly user: UserRequest
  ) {}
}
