import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BaseRepository } from 'src/common/repositories/base.repository';
import { Jobtest } from '../entities/jobtest.entity';

@Injectable()
export class JobtestRepository extends BaseRepository<Jobtest> {
  constructor(
    @InjectModel(Jobtest.name) private readonly jobtestModel: Model<Jobtest>,
  ) {
    super(jobtestModel);
  }
}
