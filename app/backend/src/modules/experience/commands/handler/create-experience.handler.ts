// File: src/modules/experiences/commands/handler/create-experiences.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProfileRepository } from 'src/modules/profile/repositories/profile.repository';
import { LoggerService } from 'src/services/logger/logger.service';
import { ErrorService } from 'src/services/error/error.service';
import { Types } from 'mongoose';
import { ExperienceRepository } from '../../repositories/experience.repository';
import { CreateExperienceCommand } from '../impl/create-experience.command';

@CommandHandler(CreateExperienceCommand)
export class CreateExperienceHandler implements ICommandHandler<CreateExperienceCommand> {
  constructor(
    private readonly experienceRepository: ExperienceRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly logger: LoggerService,
    private readonly errorService: ErrorService,
  ) {}

  async execute(command: CreateExperienceCommand): Promise<any> {
    const { createExperienceDto, user } = command;

    // Ensure user.userId is a valid ObjectId
    const userId = typeof user.userId === 'string' ? new Types.ObjectId(user.userId) : user.userId;

    // Fetch profile by user ID and populate experiences if necessary
    const profile = await this.profileRepository.findProfileByUserId(userId, ['experiences']);

    // Handle case if profile not found
    if (!profile) {
      this.errorService.throwNotFoundError('Profile not found');
      return;
    }

    // Create new experiences and link to the profile
    const experiences = await this.experienceRepository.create({
      ...createExperienceDto,
      profile: profile._id,
    });

    // Add experiences reference to the profile's experiences array
    profile.experiences = [...(profile.experiences || []), experiences._id];
    await this.profileRepository.updateProfile(profile._id as Types.ObjectId, { experiences: profile.experiences });

    // Log and return the created experiences
    this.logger.log(`Experience created and linked to profile ID: ${profile._id}`);
    return experiences;
  }
}
