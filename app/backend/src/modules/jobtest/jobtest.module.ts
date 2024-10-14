import { JobtestCommandHandlers } from './commands';
import { JobtestQueryHandlers } from './queries';
import { MongooseModule } from '@nestjs/mongoose';
import { Jobtest, JobtestSchema } from './entities/jobtest.entity';
import { Module } from '@nestjs/common';
import { JobtestService } from './jobtest.service';
import { JobtestController } from './jobtest.controller';

@Module({
imports: [MongooseModule.forFeature([{ name: Jobtest.name, schema: JobtestSchema }])],

  controllers: [JobtestController],
  providers: [JobtestService, ...JobtestCommandHandlers, ...JobtestQueryHandlers],

})
export class JobtestModule {}
