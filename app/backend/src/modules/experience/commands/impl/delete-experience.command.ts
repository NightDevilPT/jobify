// File: src/modules/experience/commands/impl/delete-experience.command.ts
import { Types } from 'mongoose';
import { UserRequest } from 'src/common/interfaces/common.interface';

export class DeleteExperienceCommand {
  constructor(
    public readonly experienceId: Types.ObjectId,
    public readonly user: UserRequest
  ) {}
}
