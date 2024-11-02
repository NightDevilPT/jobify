// File: src/modules/experience/queries/handler/get-experience-by-profile-id.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetExperienceByProfileIdQuery } from '../impl/get-experience-by-profile-id.query';
import { ExperienceRepository } from '../../repositories/experience.repository';
import { LoggerService } from 'src/services/logger/logger.service';
import { ErrorService } from 'src/services/error/error.service';
import { Types } from 'mongoose';
import { UserRepository } from 'src/modules/user/repositories/user.repository';

@QueryHandler(GetExperienceByProfileIdQuery)
export class GetExperienceByProfileIdHandler implements IQueryHandler<GetExperienceByProfileIdQuery> {
  constructor(
    private readonly experienceRepository: ExperienceRepository,
	private readonly userRepository:UserRepository,
    private readonly logger: LoggerService,
    private readonly errorService: ErrorService,
  ) {}

  async execute(query: GetExperienceByProfileIdQuery): Promise<any> {
    const { userId } = query;
    const { profile } = await this.userRepository.findUserWithProfile(userId);
    const experiences = await this.experienceRepository.getExperiencesByProfileId(profile._id as Types.ObjectId);

    this.logger.log(`Fetched experiences for profile ID: ${userId}`);
    return { experiences };
  }
}
