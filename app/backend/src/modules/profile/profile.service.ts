import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProfileCommand } from './commands/impl/create-profile.command';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateProfileCommand } from './commands/impl/update-profile.command';
import { GetProfileByIdQuery } from './queries/impl/get-profile-by-id.query';
import { GetAllProfilesQuery } from './queries/impl/get-all-profiles.query';

@Injectable()
export class ProfileService {
  constructor(private readonly commandBus: CommandBus,private readonly queryBus: QueryBus) {}

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

  async getProfileById(profileId: string) {
    return this.queryBus.execute(new GetProfileByIdQuery(profileId));
  }

  async getAllProfiles(filters: any, page: number, limit: number) {
    return this.queryBus.execute(
      new GetAllProfilesQuery(filters, page, limit),
    );
  }
}
