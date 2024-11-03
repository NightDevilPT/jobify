import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCompanyCommand } from '../impl/create-company.command';
import { CompanyRepository } from '../../repositories/company.repository';
import { ProfileRepository } from 'src/modules/profile/repositories/profile.repository';
import { LoggerService } from 'src/services/logger/logger.service';
import { ErrorService } from 'src/services/error/error.service';
import { UserType } from 'src/common/interfaces/common.interface';
import { Types } from 'mongoose';
import { UserRepository } from 'src/modules/user/repositories/user.repository';

@CommandHandler(CreateCompanyCommand)
export class CreateCompanyHandler implements ICommandHandler<CreateCompanyCommand> {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly userRepository: UserRepository, // Corrected typo: `userReposiotry` to `userRepository`
    private readonly logger: LoggerService,
    private readonly errorService: ErrorService,
  ) {}

  async execute(command: CreateCompanyCommand): Promise<any> {
    const { createCompanyDto, user } = command;

    // Check if the user has the recruiter role
    if (user.role !== UserType.RECRUITER) {
      this.errorService.throwForbiddenError(
        'Only recruiters are authorized to create a company',
      );
    }

    // Fetch the user's profile, including the 'company' field
    const profile = await this.profileRepository.findProfileByUserId(
      new Types.ObjectId(user.userId),
      ['company'],
    );

    if (!profile) {
      this.errorService.throwNotFoundError('Associated profile not found');
    }

    if (profile.company) {
      this.errorService.throwConflictError(
        'This profile is already linked with an existing company',
      );
    }

    // Create the company and associate it with the profile
    const company = await this.companyRepository.create({
      ...createCompanyDto,
      createdBy: profile._id,
      profile: profile._id,
    });

    // Update profile with the newly created company ID if company creation succeeds
    if (company) {
      await this.profileRepository.updateProfile(
        profile._id as Types.ObjectId,
        { company: company._id },
      );
      this.logger.log(`Successfully created company with ID: ${company._id}`);
      return company;
    }

    // Rollback: Delete company if creation failed and log the error message
    await this.companyRepository.deleteCompany(company._id);
    return { message: 'An error occurred; the company could not be saved. Please try again later.' };
  }
}
