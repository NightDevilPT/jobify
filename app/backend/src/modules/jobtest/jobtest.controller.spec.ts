import { Test, TestingModule } from '@nestjs/testing';
import { JobtestController } from './jobtest.controller';
import { JobtestService } from './jobtest.service';

describe('JobtestController', () => {
  let controller: JobtestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobtestController],
      providers: [JobtestService],
    }).compile();

    controller = module.get<JobtestController>(JobtestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
