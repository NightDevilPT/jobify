import { CreateCompanyDto } from '../../dto/create-company.dto';
import { UserRequest } from 'src/common/interfaces/common.interface';

export class CreateCompanyCommand {
  constructor(
    public readonly createCompanyDto: CreateCompanyDto,
    public readonly user: UserRequest,
  ) {}
}
