import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Company } from '../entities/company.entity';
import { BaseRepository } from 'src/common/repositories/base.repository';

@Injectable()
export class CompanyRepository extends BaseRepository<Company> {
  constructor(
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,
  ) {
    super(companyModel);
  }

  async createCompany(createCompanyDto: Partial<Company>): Promise<Company> {
    const company = new this.companyModel(createCompanyDto);
    return await company.save();
  }

  async updateCompany(
    companyId: Types.ObjectId,
    updateData: Partial<Company>,
  ): Promise<Company | null> {
    const updated = await this.companyModel
      .findByIdAndUpdate(companyId, updateData, { new: true })
      .exec();
    return updated;
  }

  async deleteCompany(companyId: Types.ObjectId): Promise<boolean> {
    const result = await this.companyModel.findByIdAndDelete(companyId).exec();
    return !!result;
  }

  async findById(companyId: Types.ObjectId): Promise<Company | null> {
    return this.companyModel.findById(companyId).exec();
  }

  async findOne(filter: any): Promise<Company | null> {
    return this.companyModel.findOne(filter).exec();
  }
}
