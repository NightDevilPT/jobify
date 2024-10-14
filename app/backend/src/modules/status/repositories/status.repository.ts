import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BaseRepository } from 'src/common/repositories/base.repository';
import { Status } from '../entities/status.entity';

@Injectable()
export class StatusRepository extends BaseRepository<Status> {
  constructor(
    @InjectModel(Status.name) private readonly statusModel: Model<Status>,
  ) {
    super(statusModel);
  }
}
