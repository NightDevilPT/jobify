import { ExperienceCommandHandlers } from './commands';
import { ExperienceQueryHandlers } from './queries';
import { MongooseModule } from '@nestjs/mongoose';
import { Experience, ExperienceSchema } from './entities/experience.entity';
import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';

@Module({
imports: [MongooseModule.forFeature([{ name: Experience.name, schema: ExperienceSchema }])],

  controllers: [ExperienceController],
  providers: [ExperienceService, ...ExperienceCommandHandlers, ...ExperienceQueryHandlers],

})
export class ExperienceModule {}
