import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Job } from 'src/modules/job/entities/job.entity';
import { Application } from 'src/modules/application/entities/application.entity';

@Schema({ timestamps: true })
export class Status extends Document {
  @ApiProperty({ description: 'Name of the status (e.g., Hiring, Closed, Applied, Interviewed)' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Description of the status' })
  @Prop({ type: String })
  description: string;

  @ApiProperty({ description: 'Order of the status in the job or application lifecycle' })
  @Prop({ type: Number })
  order: number;

  @ApiProperty({ description: 'Related job (if the status is for a job)' })
  @Prop({ type: Types.ObjectId, ref: 'Job', autopopulate: true })
  job: Job;

  @ApiProperty({ description: 'Related application (if the status is for an application)' })
  @Prop({ type: Types.ObjectId, ref: 'Application', autopopulate: true })
  application: Application;

  @ApiProperty({ description: 'Timestamp when the status was created' })
  createdAt: Date;
}

export const StatusSchema = SchemaFactory.createForClass(Status);
StatusSchema.plugin(require('mongoose-autopopulate'));
