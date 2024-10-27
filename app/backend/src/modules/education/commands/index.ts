import { CreateEducationHandler } from './handler/create-education.handler';
import { DeleteEducationHandler } from './handler/delete-education.handler';
import { UpdateEducationHandler } from './handler/update-education.handler';

export const EducationCommandHandlers = [
  CreateEducationHandler,
  UpdateEducationHandler,
  DeleteEducationHandler,
];
