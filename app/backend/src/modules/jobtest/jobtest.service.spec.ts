import { Test, TestingModule } from '@nestjs/testing';
import { JobtestService } from './jobtest.service';

describe('JobtestService', () => {
  let service: JobtestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobtestService],
    }).compile();

    service = module.get<JobtestService>(JobtestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
