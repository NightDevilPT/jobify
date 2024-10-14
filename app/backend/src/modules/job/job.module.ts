import { JobCommandHandlers } from './commands';
import { JobQueryHandlers } from './queries';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from './entities/job.entity';
import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';

@Module({
imports: [MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }])],

  controllers: [JobController],
  providers: [JobService, ...JobCommandHandlers, ...JobQueryHandlers],

})
export class JobModule {}
