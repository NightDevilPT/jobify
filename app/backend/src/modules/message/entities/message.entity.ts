import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Profile } from 'src/modules/profile/entities/profile.entity';
import { Application } from 'src/modules/application/entities/application.entity';

@Schema({ timestamps: true })
export class Message extends Document {
  @ApiProperty({ description: 'The application related to this message' })
  @Prop({ type: Types.ObjectId, ref: 'Application', required: true, autopopulate: true })
  application: Application;

  @ApiProperty({ description: 'The sender of the message' })
  @Prop({ type: Types.ObjectId, ref: 'Profile', required: true, autopopulate: true })
  sender: Profile;

  @ApiProperty({ description: 'The receiver of the message' })
  @Prop({ type: Types.ObjectId, ref: 'Profile', required: true, autopopulate: true })
  receiver: Profile;

  @ApiProperty({ description: 'The content of the message' })
  @Prop({ type: String, required: true })
  messageContent: string;

  @ApiProperty({ description: 'Message read status' })
  @Prop({ type: Boolean, default: false })
  readStatus: boolean;

  @ApiProperty({ description: 'Timestamp when the message was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Timestamp when the message was last updated' })
  updatedAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
MessageSchema.plugin(require('mongoose-autopopulate'));
