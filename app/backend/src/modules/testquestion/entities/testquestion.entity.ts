import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class TestQuestion extends Document {
  @ApiProperty({ description: 'The question text' })
  @Prop({ required: true })
  question: string;

  @ApiProperty({ description: 'Multiple choice questions (MCQs) or options in JSON format' })
  @Prop({ type: Object })  // Assuming JSON structure for multiple-choice options
  mcqs: Record<string, any>;

  @ApiProperty({ description: 'Correct answers (array of strings for checkbox type or a single answer for radio)' })
  @Prop({ type: [String] })
  correctAns: string[];

  @ApiProperty({ description: 'Order number of Questions' })
  @Prop({ type: Number })
  order: number;

  @ApiProperty({ description: 'User-provided answers' })
  @Prop({ type: [String] })
  userAns: string[];

  @ApiProperty({ description: 'Type of question (CHECKBOX, RADIO)' })
  @Prop({ enum: ['CHECKBOX', 'RADIO'], required: true })
  type: string;

  @ApiProperty({ description: 'Timestamp when the question was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Timestamp when the question was created' })
  updatedAt: Date;
}

export const TestQuestionSchema = SchemaFactory.createForClass(TestQuestion);
TestQuestionSchema.plugin(require('mongoose-autopopulate'));
