import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateEducationCommand } from '../impl/create-education.command';
import { EducationRepository } from '../../repositories/education.repository';
import { ProfileRepository } from 'src/modules/profile/repositories/profile.repository';
import { LoggerService } from 'src/services/logger/logger.service';
import { ErrorService } from 'src/services/error/error.service';
import { Education } from '../../entities/education.entity';
import { Types } from 'mongoose';
import { UserRepository } from 'src/modules/user/repositories/user.repository';

@CommandHandler(CreateEducationCommand)
export class CreateEducationHandler
  implements ICommandHandler<CreateEducationCommand>
{
  constructor(
    private readonly educationRepository: EducationRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly userRepository: UserRepository,
    private readonly logger: LoggerService,
    private readonly errorService: ErrorService,
  ) {}

  async execute(command: CreateEducationCommand): Promise<any> {
    const { createEducationDto, user } = command;

    // Fetch the profile associated with the user
    const { profile } = await this.userRepository.findById(user.userId, {
      path: 'profile',
    });

    if (!profile) {
      this.errorService.throwNotFoundError('Profile not found');
    }

    // Create a new education entry associated with the retrieved profile
    const education = await this.educationRepository.create({
      ...createEducationDto,
      profile: profile._id,
    });

    // Link the newly created education to the profile and save
    profile.education.push(education?._id);
    await this.profileRepository.updateProfile(profile._id as Types.ObjectId, profile);

    // Log successful creation and linkage of education entry
    this.logger.log(`Education created and linked to profile ID: ${profile._id}`);
    return education;
  }
}
