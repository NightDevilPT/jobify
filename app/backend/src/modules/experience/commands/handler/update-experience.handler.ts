// File: src/modules/experience/commands/handler/update-experience.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateExperienceCommand } from '../impl/update-experience.command';
import { ExperienceRepository } from '../../repositories/experience.repository';
import { LoggerService } from 'src/services/logger/logger.service';
import { ErrorService } from 'src/services/error/error.service';

@CommandHandler(UpdateExperienceCommand)
export class UpdateExperienceHandler implements ICommandHandler<UpdateExperienceCommand> {
  constructor(
    private readonly experienceRepository: ExperienceRepository,
    private readonly logger: LoggerService,
    private readonly errorService: ErrorService,
  ) {}

  async execute(command: UpdateExperienceCommand): Promise<any> {
    const { updateExperienceDto, experienceId, user } = command;

    const experience = await this.experienceRepository.findById(experienceId);
    if (!experience || experience.profile.toString() !== user.userId.toString()) {
      this.errorService.throwForbiddenError('Unauthorized to update this experience');
    }

    const updatedExperience = await this.experienceRepository.updateExperience(experienceId, updateExperienceDto);
    return updatedExperience;
  }
}
