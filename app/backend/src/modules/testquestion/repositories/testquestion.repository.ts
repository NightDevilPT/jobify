import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BaseRepository } from 'src/common/repositories/base.repository';
import { TestQuestion } from '../entities/testquestion.entity';

@Injectable()
export class TestquestionRepository extends BaseRepository<TestQuestion> {
  constructor(
    @InjectModel(TestQuestion.name) private readonly testquestionModel: Model<TestQuestion>,
  ) {
    super(testquestionModel);
  }
}
