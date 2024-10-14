import { Injectable } from '@nestjs/common';
import { CreateTestquestionDto } from './dto/create-testquestion.dto';
import { UpdateTestquestionDto } from './dto/update-testquestion.dto';

@Injectable()
export class TestquestionService {
  create(createTestquestionDto: CreateTestquestionDto) {
    return 'This action adds a new testquestion';
  }

  findAll() {
    return `This action returns all testquestion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testquestion`;
  }

  update(id: number, updateTestquestionDto: UpdateTestquestionDto) {
    return `This action updates a #${id} testquestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} testquestion`;
  }
}
