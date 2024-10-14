import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Company } from 'src/modules/company/entities/company.entity';
import { Profile } from 'src/modules/profile/entities/profile.entity';
import { Status } from 'src/modules/status/entities/status.entity';
import { JobTest } from 'src/modules/jobtest/entities/jobtest.entity';
import { JobType, WorkType } from 'src/common/interfaces/common.interface';

@Schema({ timestamps: true })
export class Job extends Document {
  @ApiProperty({ description: 'Title of the job' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ description: 'Description of the job' })
  @Prop({ type: String })
  description: string;

  @ApiProperty({ description: 'Address where the job is located' })
  @Prop({ type: String })
  address: string;

  @ApiProperty({ description: 'Starting salary for the job [FILTER]' })
  @Prop({ type: String })
  startSalary: string;

  @ApiProperty({ description: 'Ending salary for the job [FILTER]' })
  @Prop({ type: String })
  endSalary: string;

  @ApiProperty({ description: 'Job type (e.g., FULL_TIME, PART_TIME, CONTRACT, etc.) [FILTER]' })
  @Prop({ enum: JobType, required: true })
  jobType: JobType;

  @ApiProperty({ description: 'Work type (e.g., REMOTE, ON_SITE, HYBRID) [FILTER]' })
  @Prop({ enum: WorkType, required: true })
  workType: WorkType;

  @ApiProperty({ description: 'Skills required for the job [FILTER]' })
  @Prop({ type: [String] })
  requiredSkills: string[];

  @ApiProperty({ description: 'Years of experience required for the job [FILTER]' })
  @Prop({ type: Number })
  requiredExperience: number;

  @ApiProperty({ description: 'Current status of the job (e.g., Hiring, Closed)' })
  @Prop({ enum: ['Hiring', 'Closed'], required: true })
  jobStatus: string;

  @ApiProperty({ type: Company, description: 'Company that posted the job' })
  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, autopopulate: true })
  company: Company;

  @ApiProperty({ type: Profile, description: 'Profile that created the job' })
  @Prop({ type: Types.ObjectId, ref: 'Profile', required: true, autopopulate: true })
  createdBy: Profile;

  @ApiProperty({ type: [JobTest], description: 'Tests associated with the job' })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'JobTest', autopopulate: true }] })
  jobTests: JobTest[];

  @ApiProperty({ type: [Status], description: 'Statuses associated with the job' })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Status', autopopulate: true }] })
  statuses: Status[];
  
  @ApiProperty({ description: 'Timestamp when the job test was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Timestamp when the job test was created' })
  updatedAt: Date;
}

export const JobSchema = SchemaFactory.createForClass(Job);
JobSchema.plugin(require('mongoose-autopopulate'));
