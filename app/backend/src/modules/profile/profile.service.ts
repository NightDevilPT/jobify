import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateProfileCommand } from './commands/impl/create-profile.command';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateProfileCommand } from './commands/impl/update-profile.command';

@Injectable()
export class ProfileService {
  constructor(private readonly commandBus: CommandBus) {}

  async createProfile(createProfileDto: CreateProfileDto, userId: string) {
    return this.commandBus.execute(
      new CreateProfileCommand(createProfileDto, userId),
    );
  }

  async updateProfile(updateProfileDto: UpdateProfileDto, profileId: string) {
    return this.commandBus.execute(
      new UpdateProfileCommand(updateProfileDto, profileId),
    );
  }
}
