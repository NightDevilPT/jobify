// File: src/modules/experience/commands/index.ts
import { CreateExperienceHandler } from './handler/create-experience.handler';
import { UpdateExperienceHandler } from './handler/update-experience.handler';
import { DeleteExperienceHandler } from './handler/delete-experience.handler';

export const ExperienceCommandHandlers = [
  CreateExperienceHandler,
  UpdateExperienceHandler,
  DeleteExperienceHandler,
];
