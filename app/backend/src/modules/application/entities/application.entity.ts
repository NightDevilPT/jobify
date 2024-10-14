import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from 'src/modules/status/entities/status.entity';
import { Job } from 'src/modules/job/entities/job.entity';
import { Profile } from 'src/modules/profile/entities/profile.entity';

@Schema({ timestamps: true })
export class Application extends Document {
  @ApiProperty({ description: 'User who applied' })
  @Prop({ type: Types.ObjectId, ref: 'Profile', autopopulate: true })
  profile: Profile;

  @ApiProperty({ description: 'Job the application is for' })
  @Prop({ type: Types.ObjectId, ref: 'Job', autopopulate: true })
  job: Job;

  @ApiProperty({ type: Status, description: 'Current status of the application' })
  @Prop({ type: Types.ObjectId, ref: 'Status', autopopulate: true })
  status: Status;

  @ApiProperty({ description: 'Timestamp when the application was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Timestamp when the application was last updated' })
  updatedAt: Date;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
ApplicationSchema.plugin(require('mongoose-autopopulate'));
