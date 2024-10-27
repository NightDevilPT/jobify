import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EducationRepository } from '../../repositories/education.repository';
import { ProfileRepository } from 'src/modules/profile/repositories/profile.repository';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { LoggerService } from 'src/services/logger/logger.service';
import { ErrorService } from 'src/services/error/error.service';
import { DeleteEducationCommand } from '../impl/delete-education.command';
import { BaseResponse } from 'src/common/interfaces/response';

@CommandHandler(DeleteEducationCommand)
export class DeleteEducationHandler
  implements ICommandHandler<DeleteEducationCommand> 
{
  constructor(
    private readonly educationRepository: EducationRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly userRepository: UserRepository,
    private readonly logger: LoggerService,
    private readonly errorService: ErrorService,
  ) {}

  async execute(command: DeleteEducationCommand): Promise<BaseResponse> {
    const { educationId, user } = command;

    // Fetch the profile associated with the user
    const { profile } = await this.userRepository.findById(user.userId, {
      path: 'profile',
    });

    if (!profile) {
      this.errorService.throwNotFoundError('Profile not found');
      return;
    }

    // Find the education entry and verify it belongs to the user's profile
    const education = await this.educationRepository.findById(educationId);
    if (!education || education.profile.toString() !== profile._id.toString()) {
      this.logger.error(`Unauthorized attempt to delete education with ID: ${educationId}`);
      this.errorService.throwForbiddenError('Unauthorized to delete this education record');
      return;
    }

    // Delete the education entry
    const deleted = await this.educationRepository.deleteEducation(educationId);
    if (!deleted) {
      this.logger.error(`Failed to delete education with ID: ${educationId}`);
      this.errorService.throwNotFoundError('Education deletion failed');
      return;
    }

    // Update the profile by removing the education ID from the education array
    profile.education = profile.education.filter(id => id.toString() !== educationId.toString());
    await this.profileRepository.updateProfile(profile._id, { education: profile.education });

    // Log successful deletion
    this.logger.log(`Education deleted and profile updated for education ID: ${educationId}`);
    return {message:`Education ${educationId} successfully deleted`}
  }
}
