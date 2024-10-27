import { Types } from 'mongoose';
import { UserRequest } from 'src/common/interfaces/common.interface';

export class GetEducationsByProfileIdQuery {
  constructor(public readonly userId: Types.ObjectId) {}
}