import { ResumeCommandHandlers } from './commands';
import { ResumeQueryHandlers } from './queries';
import { MongooseModule } from '@nestjs/mongoose';
import { Resume, ResumeSchema } from './entities/resume.entity';
import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';

@Module({
imports: [MongooseModule.forFeature([{ name: Resume.name, schema: ResumeSchema }])],

  controllers: [ResumeController],
  providers: [ResumeService, ...ResumeCommandHandlers, ...ResumeQueryHandlers],

})
export class ResumeModule {}
