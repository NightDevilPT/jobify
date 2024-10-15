import { Document } from 'mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Profile } from 'src/modules/profile/entities/profile.entity';

export class Resume extends Document {
  @ApiProperty({ description: 'URL of the resume file' })
  @Prop({ type: String, required: true })
  resumeUrl: string;

  @ApiProperty({ description: 'Profile associated with the resume' })
  @Prop({ type: Profile, required: true })
  profile: Profile;

  @ApiProperty({ description: 'Timestamp when the resume was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Timestamp when the resume was last updated' })
  updatedAt: Date;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);
ResumeSchema.plugin(require('mongoose-autopopulate'));
