import { Types } from 'mongoose';
import { UpdateEducationDto } from '../../dto/update-education.dto';
import { UserRequest } from 'src/common/interfaces/common.interface';

export class UpdateEducationCommand {
  constructor(
    public readonly updateEducationDto: UpdateEducationDto,
    public readonly educationId: Types.ObjectId,
	  public readonly user: UserRequest
  ) {}
}
