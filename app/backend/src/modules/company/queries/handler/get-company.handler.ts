import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCompanyQuery } from '../impl/get-company.query';
import { CompanyRepository } from '../../repositories/company.repository';
import { LoggerService } from 'src/services/logger/logger.service';
import { ProfileRepository } from 'src/modules/profile/repositories/profile.repository';
import { ErrorService } from 'src/services/error/error.service';
import { Types } from 'mongoose';

@QueryHandler(GetCompanyQuery)
export class GetCompanyHandler implements IQueryHandler<GetCompanyQuery> {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly logger: LoggerService,
    private readonly errorService: ErrorService,
  ) {}

  async execute(query: GetCompanyQuery): Promise<any> {
    const { userId } = query;

    try {
      // Validate and convert userId to ObjectId if necessary
      const userObjectId = new Types.ObjectId(userId);

      // Fetch profile by user ID with the company field populated
      const profileWithCompany = await this.profileRepository.findProfileByUserId(
        userObjectId,
        ['company']
      );

      if (!profileWithCompany) {
        this.logger.warn(`Profile not found for user ID: ${userId}`);
        throw this.errorService.throwNotFoundError('Profile not found');
      }

      const { company } = profileWithCompany;

      if (company) {
        this.logger.log(`Successfully fetched company for user ID: ${userId}`);
        return { company };
      } else {
        this.logger.warn(`Company not found for profile with user ID: ${userId}`);
        this.errorService.throwForbiddenError(
          'Only recruiters are authorized to create a company',
        );
      }
    } catch (error) {
      if (!error.isOperational) {
        this.logger.error(
          `An unexpected error occurred while fetching company for user ID: ${userId}`,
          error,
        );
      }
      this.errorService.throwInternalServerError(
        'Failed to retrieve company records. Please try again later.',
      );
    }
  }
}
