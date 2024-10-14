import { Test, TestingModule } from '@nestjs/testing';
import { TestquestionController } from './testquestion.controller';
import { TestquestionService } from './testquestion.service';

describe('TestquestionController', () => {
  let controller: TestquestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestquestionController],
      providers: [TestquestionService],
    }).compile();

    controller = module.get<TestquestionController>(TestquestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
