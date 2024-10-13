import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BaseRepository } from 'src/common/repositories/base.repository';
import { History } from '../entities/history.entity';

@Injectable()
export class HistoryRepository extends BaseRepository<History> {
  constructor(
    @InjectModel(History.name) private readonly historyModel: Model<History>,
  ) {
    super(historyModel);
  }
}
