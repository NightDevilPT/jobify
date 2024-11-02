// File: src/modules/experience/commands/impl/update-experience.command.ts
import { Types } from 'mongoose';
import { UpdateExperienceDto } from '../../dto/update-experience.dto';
import { UserRequest } from 'src/common/interfaces/common.interface';

export class UpdateExperienceCommand {
  constructor(
    public readonly updateExperienceDto: UpdateExperienceDto,
    public readonly experienceId: Types.ObjectId,
    public readonly user: UserRequest
  ) {}
}
