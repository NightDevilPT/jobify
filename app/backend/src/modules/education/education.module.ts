import { EducationCommandHandlers } from './commands';
import { EducationQueryHandlers } from './queries';
import { MongooseModule } from '@nestjs/mongoose';
import { Education, EducationSchema } from './entities/education.entity';
import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';

@Module({
imports: [MongooseModule.forFeature([{ name: Education.name, schema: EducationSchema }])],

  controllers: [EducationController],
  providers: [EducationService, ...EducationCommandHandlers, ...EducationQueryHandlers],

})
export class EducationModule {}
