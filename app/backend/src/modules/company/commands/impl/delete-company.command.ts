import { Types } from 'mongoose';
import { UserRequest } from 'src/common/interfaces/common.interface';

export class DeleteCompanyCommand {
  constructor(
    public readonly companyId: Types.ObjectId,
    public readonly user: UserRequest,
  ) {}
}
