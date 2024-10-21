import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProfileCommand } from '../impl/create-profile.command';
import { Profile } from '../../entities/profile.entity';
import { LoggerService } from 'src/services/logger/logger.service';
import { ErrorService } from 'src/services/error/error.service';
import { ProfileRepository } from '../../repositories/profile.repository';
import { UserRepository } from 'src/modules/user/repositories/user.repository';

@CommandHandler(CreateProfileCommand)
export class CreateProfileHandler
  implements ICommandHandler<CreateProfileCommand>
{
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly userRepository: UserRepository, // Inject the UserRepository to update the user
    private readonly logger: LoggerService,
    private readonly errorService: ErrorService,
  ) {}

  async execute(command: CreateProfileCommand): Promise<Profile> {
    const { createProfileDto, userId } = command;
    const { firstname, lastname, gender, address, description } =
      createProfileDto;

    // Log the action for debugging
    this.logger.log(`Attempting to create profile for user ID: ${userId}`);

    // Check if the user exists
    const user = await this.userRepository.findById(userId);
    if (!user) {
      this.errorService.throwNotFoundError('User not found');
    }

    // Check if the user already has a profile
    if (user.profile) {
      this.logger.error(
        `Profile creation failed. User ID: ${userId} already has a profile.`,
      );
      throw this.errorService.throwConflictError(
        'This user already has a profile. You cannot create another profile for the same user.',
      );
    }

    // Create a new profile entity
    const newProfile = await this.profileRepository.create({
      firstname,
      lastname,
      gender,
      address,
      description,
      user: userId,
    });

    // Update the user to reference the created profile
    user.profile = newProfile;
    await this.userRepository.update(userId, user);

    this.logger.log(
      `Profile created successfully and associated with user ID: ${userId}`,
    );
    return newProfile.toObject();
  }
}
