import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { TestQuestion } from 'src/modules/testquestion/entities/testquestion.entity';
import { Job } from 'src/modules/job/entities/job.entity';

@Schema({ timestamps: true })
export class JobTest extends Document {
  @ApiProperty({ description: 'Title of the job test' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ description: 'Description of the job test' })
  @Prop({ type: String })
  description: string;

  @ApiProperty({ type: [Job], description: 'Tests associated with the job' })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'JobTest', autopopulate: true }] })
  job: Job;

  @ApiProperty({ type: [TestQuestion], description: 'Questions in the job test' })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'TestQuestion', autopopulate: true }] })
  testQuestions: TestQuestion[];

  @ApiProperty({ description: 'Timestamp when the job test was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Timestamp when the job test was created' })
  updatedAt: Date;
}

export const JobTestSchema = SchemaFactory.createForClass(JobTest);
JobTestSchema.plugin(require('mongoose-autopopulate'));
