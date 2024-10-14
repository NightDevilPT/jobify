import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BaseRepository } from 'src/common/repositories/base.repository';
import { Education } from '../entities/education.entity';

@Injectable()
export class EducationRepository extends BaseRepository<Education> {
  constructor(
    @InjectModel(Education.name) private readonly educationModel: Model<Education>,
  ) {
    super(educationModel);
  }
}
