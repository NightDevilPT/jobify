import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Profile } from 'src/modules/profile/entities/profile.entity';
import { Job } from 'src/modules/job/entities/job.entity';

@Schema({ timestamps: true })
export class Company extends Document {
  @ApiProperty({ description: 'Name of the company' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Address of the company' })
  @Prop()
  address: string;

  @ApiProperty({ description: 'Website of the company' })
  @Prop()
  website: string;

  @ApiProperty({ description: 'Description of the company' })
  @Prop()
  description: string;

  @ApiProperty({ type: Profile, description: 'Profile who created the company' })
  @Prop({ type: Types.ObjectId, ref: 'Profile', required: true, autopopulate: false })
  createdBy: Profile;

  @ApiProperty({ type: [Job], description: 'List of jobs posted by the company' })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Job', autopopulate: false }] })
  jobs: Job[];

  @ApiProperty({ type: () => Profile, description: 'Associated profile for this company' })
  @Prop({ type: Types.ObjectId, ref: 'Profile', autopopulate: false }) // One-to-One relation with Profile
  profile: Profile | null;

  @ApiProperty({ description: 'Timestamp when the message was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Timestamp when the message was last updated' })
  updatedAt: Date;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
CompanySchema.plugin(require('mongoose-autopopulate'));
