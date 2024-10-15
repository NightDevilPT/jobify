import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BaseRepository } from 'src/common/repositories/base.repository';
import { Resume } from '../entities/resume.entity';

@Injectable()
export class ResumeRepository extends BaseRepository<Resume> {
  constructor(
    @InjectModel(Resume.name) private readonly resumeModel: Model<Resume>,
  ) {
    super(resumeModel);
  }
}
