import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BaseRepository } from 'src/common/repositories/base.repository';
import { Experience } from '../entities/experience.entity';

@Injectable()
export class ExperienceRepository extends BaseRepository<Experience> {
  constructor(
    @InjectModel(Experience.name) private readonly experienceModel: Model<Experience>,
  ) {
    super(experienceModel);
  }
}
