import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { DegreeEnum } from 'src/common/interfaces/common.interface';
import { Profile } from 'src/modules/profile/entities/profile.entity';

@Schema({ timestamps: true })
export class Education extends Document {
  @ApiProperty({ description: 'Degree type (e.g., Bachelors, Masters)' })
  @Prop({ enum: DegreeEnum, required: true })
  degree: string;

  @ApiProperty({ description: 'Institution where the degree was obtained' })
  @Prop({ required: true })
  institution: string;

  @ApiProperty({ description: 'Start date of the education' })
  @Prop({ type: Date })
  startDate: Date;

  @ApiProperty({ description: 'End date of the education' })
  @Prop({ type: Date })
  endDate: Date;

  @ApiProperty({ description: 'Whether the education is ongoing' })
  @Prop({ default: false })
  isCurrent: boolean;

  @ApiProperty({ description: 'Associated profile for this education record', type: () => Profile })
  @Prop({ type: Types.ObjectId, ref: 'Profile', required: true, autopopulate: true })
  profile: Types.ObjectId;
}

export const EducationSchema = SchemaFactory.createForClass(Education);
EducationSchema.plugin(require('mongoose-autopopulate'));  // Applying autopopulate plugin here
