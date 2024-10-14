import { TestquestionCommandHandlers } from './commands';
import { TestquestionQueryHandlers } from './queries';
import { MongooseModule } from '@nestjs/mongoose';
import { Testquestion, TestquestionSchema } from './entities/testquestion.entity';
import { Module } from '@nestjs/common';
import { TestquestionService } from './testquestion.service';
import { TestquestionController } from './testquestion.controller';

@Module({
imports: [MongooseModule.forFeature([{ name: Testquestion.name, schema: TestquestionSchema }])],

  controllers: [TestquestionController],
  providers: [TestquestionService, ...TestquestionCommandHandlers, ...TestquestionQueryHandlers],

})
export class TestquestionModule {}
