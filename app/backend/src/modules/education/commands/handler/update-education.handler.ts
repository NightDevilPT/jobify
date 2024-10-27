import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateEducationCommand } from '../impl/update-education.command';
import { EducationRepository } from '../../repositories/education.repository';
import { ProfileRepository } from 'src/modules/profile/repositories/profile.repository';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { LoggerService } from 'src/services/logger/logger.service';
import { ErrorService } from 'src/services/error/error.service';
import { Education } from '../../entities/education.entity';
import { Types } from 'mongoose';

@CommandHandler(UpdateEducationCommand)
export class UpdateEducationHandler
  implements ICommandHandler<UpdateEducationCommand> 
{
  constructor(
    private readonly educationRepository: EducationRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly userRepository: UserRepository,
    private readonly logger: LoggerService,
    private readonly errorService: ErrorService,
  ) {}

  async execute(command: UpdateEducationCommand): Promise<Education> {
    const { updateEducationDto, educationId, user } = command;

    // Fetch the profile associated with the user
    const { profile } = await this.userRepository.findById(user.userId, {
      path: 'profile',
    });

    if (!profile) {
      this.errorService.throwNotFoundError('Profile not found');
    }

    // Verify that the education entry belongs to the user's profile
    const education = await this.educationRepository.findById(educationId);
    if (!education || education.profile.toString() !== profile._id.toString()) {
      this.logger.error(`Unauthorized attempt to update education with ID: ${educationId}`);
      this.errorService.throwForbiddenError('Unauthorized to update this education record');
    }

    // Perform the update
    const updatedEducation = await this.educationRepository.updateEducation(educationId, updateEducationDto);
    if (!updatedEducation) {
      this.logger.error(`Failed to update education with ID: ${educationId}`);
      this.errorService.throwNotFoundError('Education not found');
    }

    // Log successful update
    this.logger.log(`Education updated for ID: ${educationId} and linked to profile ID: ${profile._id}`);
    return updatedEducation.toObject();
  }
}
