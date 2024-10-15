import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BaseRepository } from 'src/common/repositories/base.repository';
import { JobTest } from '../entities/jobtest.entity';

@Injectable()
export class JobtestRepository extends BaseRepository<JobTest> {
  constructor(
    @InjectModel(JobTest.name) private readonly jobtestModel: Model<JobTest>,
  ) {
    super(jobtestModel);
  }
}
