// File: app/backend/src/modules/education/queries/handler/get-educations-by-profile-id.handler.ts

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetEducationsByProfileIdQuery } from '../impl/get-educations-by-profile-id.query';
import { EducationRepository } from '../../repositories/education.repository';
import { LoggerService } from 'src/services/logger/logger.service';
import { ErrorService } from 'src/services/error/error.service';
import { Education } from '../../entities/education.entity';
import { Types } from 'mongoose';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { ProfileRepository } from 'src/modules/profile/repositories/profile.repository';

@QueryHandler(GetEducationsByProfileIdQuery)
export class GetEducationsByProfileIdHandler
  implements IQueryHandler<GetEducationsByProfileIdQuery>
{
  constructor(
    private readonly educationRepository: EducationRepository,
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly logger: LoggerService,
    private readonly errorService: ErrorService,
  ) {}

  async execute(
    query: GetEducationsByProfileIdQuery,
  ): Promise<{ educations: Education[] } | any> {
    const { userId } = query;
    const { profile } = await this.userRepository.findUserWithProfile(userId);
    try {
      // Fetch all education entries associated with the given profileId
      const {education} = await this.profileRepository.findProfileEducationByUserId(
        new Types.ObjectId(userId),
      );

      // Log successful retrieval
      this.logger.log(
        `Successfully fetched ${education.length} education records for profile ID: ${profile?._id}`,
      );

      return { educations:education };
    } catch (error) {
      this.logger.error(
        `An error occurred while fetching education records for profile ID: ${profile?._id}`,
        error,
      );
      this.errorService.throwInternalServerError(
        'Failed to retrieve education records. Please try again later.',
      );
    }
  }
}
