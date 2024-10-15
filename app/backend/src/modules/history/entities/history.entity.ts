import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HistoryEventType } from 'src/common/interfaces/common.interface';
import { Profile } from 'src/modules/profile/entities/profile.entity';

@Schema({ timestamps: true })
export class History extends Document {
  @ApiProperty({ enum: HistoryEventType, description: 'Type of event' })
  @Prop({ enum: HistoryEventType, required: true })
  eventType: HistoryEventType;

  @ApiProperty({ description: 'Previous state (as JSON key-value pairs)', type: Object })
  @Prop({ type: Types.Map, default: {} }) // Storing flexible JSON for the "from" state
  from: Record<string, any>;

  @ApiProperty({ description: 'New state (as JSON key-value pairs)', type: Object })
  @Prop({ type: Types.Map, default: {} }) // Storing flexible JSON for the "to" state
  to: Record<string, any>;

  @ApiProperty({ type: Profile, description: 'Profile who triggered the event' })
  @Prop({ type: Types.ObjectId, ref: 'Profile', required: true, autopopulate: true }) // Relationship to Profile
  profileId: Types.ObjectId;

  @ApiProperty({ description: 'ID of the related entity (such as an application or job)' })
  @Prop({ type: Types.ObjectId, required: true }) // Reference to the related entity
  relatedId: Types.ObjectId;

  @ApiProperty({ description: 'Name of the related table (e.g., Applications, Jobs)' })
  @Prop({ required: true })
  relatedTable: string; // Name of the table the relatedId belongs to
}

export const HistorySchema = SchemaFactory.createForClass(History);
HistorySchema.plugin(require('mongoose-autopopulate'));
