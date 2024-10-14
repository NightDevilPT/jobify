import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BaseRepository } from 'src/common/repositories/base.repository';
import { Job } from '../entities/job.entity';

@Injectable()
export class JobRepository extends BaseRepository<Job> {
  constructor(
    @InjectModel(Job.name) private readonly jobModel: Model<Job>,
  ) {
    super(jobModel);
  }
}
