// File: src/modules/experience/commands/handler/delete-experience.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteExperienceCommand } from '../impl/delete-experience.command';
import { ExperienceRepository } from '../../repositories/experience.repository';
import { LoggerService } from 'src/services/logger/logger.service';
import { ErrorService } from 'src/services/error/error.service';

@CommandHandler(DeleteExperienceCommand)
export class DeleteExperienceHandler implements ICommandHandler<DeleteExperienceCommand> {
  constructor(
    private readonly experienceRepository: ExperienceRepository,
    private readonly logger: LoggerService,
    private readonly errorService: ErrorService,
  ) {}

  async execute(command: DeleteExperienceCommand): Promise<any> {
    const { experienceId, user } = command;
    const experience = await this.experienceRepository.findById(experienceId);

    if (!experience || experience.profile.toString() !== user.userId.toString()) {
      this.errorService.throwForbiddenError('Unauthorized to delete this experience');
    }

    await this.experienceRepository.deleteExperience(experienceId);
    this.logger.log(`Experience deleted with ID: ${experienceId}`);
  }
}
