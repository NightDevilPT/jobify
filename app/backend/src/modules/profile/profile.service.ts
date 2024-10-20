import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateProfileCommand } from './commands/impl/create-profile.command';

@Injectable()
export class ProfileService {
  constructor(private readonly commandBus: CommandBus) {}

  async createProfile(createProfileDto: CreateProfileDto, userId: string) {
    return this.commandBus.execute(
      new CreateProfileCommand(createProfileDto, userId),
    );
  }
}
