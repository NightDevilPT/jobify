import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BaseRepository } from 'src/common/repositories/base.repository';
import { Company } from '../entities/company.entity';

@Injectable()
export class CompanyRepository extends BaseRepository<Company> {
  constructor(
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,
  ) {
    super(companyModel);
  }
}
