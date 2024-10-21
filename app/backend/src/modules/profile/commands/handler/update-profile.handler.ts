import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProfileCommand } from '../impl/update-profile.command';
import { ProfileRepository } from '../../repositories/profile.repository';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { LoggerService } from 'src/services/logger/logger.service';
import { ErrorService } from 'src/services/error/error.service';
import { Profile } from '../../entities/profile.entity';

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileHandler
  implements ICommandHandler<UpdateProfileCommand>
{
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly userRepository: UserRepository,
    private readonly logger: LoggerService,
    private readonly errorService: ErrorService,
  ) {}

  async execute(command: UpdateProfileCommand): Promise<Profile> {
    const { updateProfileDto, profileId } = command;
    const { firstname, lastname, gender, address, description } = updateProfileDto;

    // Log the start of the profile update process
    this.logger.log(`Starting profile update for profile ID: ${profileId}`);

    // Retrieve the existing profile
    const profile = await this.profileRepository.findProfileById(profileId);
    if (!profile) {
      this.logger.error(`Profile not found for ID: ${profileId}`);
      throw this.errorService.throwNotFoundError('Profile not found.');
    }

    // Apply the provided updates
    if (firstname) profile.firstname = firstname;
    if (lastname) profile.lastname = lastname;
    if (gender) profile.gender = gender;
    if (address) profile.address = address;
    if (description) profile.description = description;

    // Persist the updated profile
    const updatedProfile = await this.profileRepository.updateProfile(profileId, profile, true);
    
    if (!updatedProfile) {
      this.logger.error(`Profile update failed for ID: ${profileId}`);
      throw this.errorService.throwInternalServerError('Failed to update profile.');
    }

    this.logger.log(`Profile successfully updated for ID: ${profileId}`);

    // Return the updated profile as an object
    return updatedProfile.toObject();
  }
}
