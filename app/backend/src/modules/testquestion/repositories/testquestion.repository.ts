import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BaseRepository } from 'src/common/repositories/base.repository';
import { Testquestion } from '../entities/testquestion.entity';

@Injectable()
export class TestquestionRepository extends BaseRepository<Testquestion> {
  constructor(
    @InjectModel(Testquestion.name) private readonly testquestionModel: Model<Testquestion>,
  ) {
    super(testquestionModel);
  }
}
