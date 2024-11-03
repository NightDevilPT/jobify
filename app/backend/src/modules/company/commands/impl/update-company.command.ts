import { UpdateCompanyDto } from '../../dto/update-company.dto';
import { Types } from 'mongoose';
import { UserRequest } from 'src/common/interfaces/common.interface';

export class UpdateCompanyCommand {
  constructor(
    public readonly updateCompanyDto: UpdateCompanyDto,
    public readonly companyId: Types.ObjectId,
    public readonly user: UserRequest,
  ) {}
}
