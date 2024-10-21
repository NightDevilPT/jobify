// src/modules/profile/commands/impl/create-profile.command.ts

import { UpdateProfileDto } from "../../dto/update-profile.dto";

export class UpdateProfileCommand {
  constructor(
    public readonly updateProfileDto: UpdateProfileDto,
    public readonly profileId: string
  ) {}
}
