import { Injectable } from '@nestjs/common';
import { CreateJobtestDto } from './dto/create-jobtest.dto';
import { UpdateJobtestDto } from './dto/update-jobtest.dto';

@Injectable()
export class JobtestService {
  create(createJobtestDto: CreateJobtestDto) {
    return 'This action adds a new jobtest';
  }

  findAll() {
    return `This action returns all jobtest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobtest`;
  }

  update(id: number, updateJobtestDto: UpdateJobtestDto) {
    return `This action updates a #${id} jobtest`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobtest`;
  }
}
