// File: app/backend/src/modules/profile/queries/handler/get-profile-by-id.handler.ts

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProfileByIdQuery } from '../impl/get-profile-by-id.query';
import { ProfileRepository } from '../../repositories/profile.repository';
import { LoggerService } from 'src/services/logger/logger.service';
import { ErrorService } from 'src/services/error/error.service';
import { Profile } from '../../entities/profile.entity';

@QueryHandler(GetProfileByIdQuery)
export class GetProfileByIdHandler implements IQueryHandler<GetProfileByIdQuery> {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly logger: LoggerService,
    private readonly errorService: ErrorService,
  ) {}

  async execute(query: GetProfileByIdQuery): Promise<Profile> {
    const { profileId } = query;

    // Log the retrieval process
    this.logger.log(`Fetching profile with ID: ${profileId}`);

    // Find the profile by ID
    const profile = await this.profileRepository.findProfileById(profileId, true); // Populate user data
    if (!profile) {
      this.logger.error(`Profile not found with ID: ${profileId}`);
      throw this.errorService.throwNotFoundError('Profile not found.');
    }

    // Return the profile as an object
    this.logger.log(`Profile retrieved successfully for ID: ${profileId}`);
    return profile;
  }
}
