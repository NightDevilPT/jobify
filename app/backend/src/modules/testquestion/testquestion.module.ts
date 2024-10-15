import { TestquestionCommandHandlers } from './commands';
import { TestquestionQueryHandlers } from './queries';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TestquestionService } from './testquestion.service';
import { TestquestionController } from './testquestion.controller';
import { TestQuestion, TestQuestionSchema } from './entities/testquestion.entity';

@Module({
imports: [MongooseModule.forFeature([{ name: TestQuestion.name, schema: TestQuestionSchema }])],

  controllers: [TestquestionController],
  providers: [TestquestionService, ...TestquestionCommandHandlers, ...TestquestionQueryHandlers],

})
export class TestquestionModule {}
