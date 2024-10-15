import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BaseRepository } from 'src/common/repositories/base.repository';
import { Application } from '../entities/application.entity';

@Injectable()
export class ApplicationRepository extends BaseRepository<Application> {
  constructor(
    @InjectModel(Application.name) private readonly applicationModel: Model<Application>,
  ) {
    super(applicationModel);
  }
}
