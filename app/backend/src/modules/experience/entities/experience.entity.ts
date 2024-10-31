import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Profile } from 'src/modules/profile/entities/profile.entity';

@Schema({ timestamps: true })
export class Experience extends Document {
  @ApiProperty({ description: 'Job title or role' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ description: 'Company where the experience was gained' })
  @Prop({ required: true })
  company: string;

  @ApiProperty({ description: 'Location of the job or experience' })
  @Prop()
  location: string;

  @ApiProperty({ description: 'Start date of the job or experience' })
  @Prop({ type: Date })
  startDate: Date;

  @ApiProperty({ description: 'End date of the job or experience' })
  @Prop({ type: Date })
  endDate: Date;

  @ApiProperty({ description: 'Whether the experience is current' })
  @Prop({ default: false })
  isCurrent: boolean;

  @ApiProperty({ description: 'Description of responsibilities and duties' })
  @Prop()
  description: string;

  @ApiProperty({ description: 'Technologies used during the experience' })
  @Prop([String])
  technologies: string[];

  @ApiProperty({ description: 'Associated profile for this Exterience record', type: () => Profile })
  @Prop({ type: Types.ObjectId, ref: 'Profile', required: true, autopopulate: true })
  profile: Types.ObjectId;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);
ExperienceSchema.plugin(require('mongoose-autopopulate'));  // Applying autopopulate plugin here
