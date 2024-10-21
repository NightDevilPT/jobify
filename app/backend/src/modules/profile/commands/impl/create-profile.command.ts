// src/modules/profile/commands/impl/create-profile.command.ts

import { CreateProfileDto } from '../../dto/create-profile.dto';

export class CreateProfileCommand {
  constructor(
    public readonly createProfileDto: CreateProfileDto,
    public readonly userId: string
  ) {}
}
