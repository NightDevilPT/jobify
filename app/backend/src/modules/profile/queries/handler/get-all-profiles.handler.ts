import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllProfilesQuery } from '../impl/get-all-profiles.query';
import { ProfileRepository } from '../../repositories/profile.repository';
import { LoggerService } from 'src/services/logger/logger.service';
import { ErrorService } from 'src/services/error/error.service';
import { BaseResponse } from 'src/common/interfaces/response';
import { Profile } from '../../entities/profile.entity';

@QueryHandler(GetAllProfilesQuery)
export class GetAllProfilesHandler implements IQueryHandler<GetAllProfilesQuery> {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly logger: LoggerService,
    private readonly errorService: ErrorService, // Error service to handle any potential issues
  ) {}

  async execute(query: GetAllProfilesQuery): Promise<BaseResponse<Profile[]>> {
    const { filters, page, limit } = query;

    // Log the start of the profile fetching process
    this.logger.log('Initiating the process to fetch all profiles with filters and pagination.');

    try {
      const { data, totalCount } = await this.profileRepository.findAllProfiles(filters, page, limit, true);

      const totalPages = Math.ceil(totalCount / limit);
      const meta = {
        totalPages,
        currentPage: page,
        nextPage: page < totalPages ? page + 1 : null,
        previousPage: page > 1 ? page - 1 : null,
        totalCount,
      };

      // Log the successful retrieval of profiles
      this.logger.log(`Successfully retrieved ${data.length} profiles. Total profiles available: ${totalCount}`);

      return { 
        data, 
        meta, 
        message: 'Profiles have been successfully retrieved.' 
      };

    } catch (error) {
      // Log the error and use ErrorService to throw a standardized error response
      this.logger.error('An error occurred while fetching profiles.', error);
      this.errorService.throwInternalServerError('Unable to fetch profiles at this time. Please try again later.');
    }
  }
}
