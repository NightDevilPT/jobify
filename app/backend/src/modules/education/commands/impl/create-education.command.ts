import { Types } from 'mongoose';
import { CreateEducationDto } from '../../dto/create-education.dto';
import { UserRequest } from 'src/common/interfaces/common.interface';

export class CreateEducationCommand {
  constructor(
    public readonly createEducationDto: CreateEducationDto,
    public readonly user: UserRequest
  ) {}
}
