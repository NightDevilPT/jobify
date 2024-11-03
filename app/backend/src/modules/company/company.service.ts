import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCompanyCommand } from './commands/impl/create-company.command';
import { UpdateCompanyCommand } from './commands/impl/update-company.command';
import { DeleteCompanyCommand } from './commands/impl/delete-company.command';
import { GetCompanyQuery } from './queries/impl/get-company.query';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Types } from 'mongoose';
import { UserRequest } from 'src/common/interfaces/common.interface';

@Injectable()
export class CompanyService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  async createCompany(createCompanyDto: CreateCompanyDto, user: UserRequest) {
    return this.commandBus.execute(new CreateCompanyCommand(createCompanyDto, user));
  }

  async updateCompany(updateCompanyDto: UpdateCompanyDto, user: UserRequest, companyId: Types.ObjectId) {
    return this.commandBus.execute(new UpdateCompanyCommand(updateCompanyDto, companyId, user));
  }

  async deleteCompany(companyId: Types.ObjectId, user: UserRequest) {
    return this.commandBus.execute(new DeleteCompanyCommand(companyId, user));
  }

  async getCompanyByUserId(userId: Types.ObjectId) {
    return this.queryBus.execute(new GetCompanyQuery(userId));
  }
}
