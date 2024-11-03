import { Types } from 'mongoose';
import { UserRequest } from 'src/common/interfaces/common.interface';

export class GetCompanyQuery {
  constructor(public readonly userId: Types.ObjectId) {}
}
