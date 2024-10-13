import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';
import { Gender } from 'src/common/interfaces/common.interface';
import { History } from 'src/modules/history/entities/history.entity';

@Schema({ timestamps: true })
export class Profile extends Document {
  @ApiProperty({ description: 'First name of the user' })
  @Prop()
  firstname: string;

  @ApiProperty({ description: 'Last name of the user' })
  @Prop()
  lastname: string;

  @ApiProperty({ enum: Gender, description: 'Gender of the user' })
  @Prop({ enum: Gender })
  gender: Gender;

  @ApiProperty({ description: 'Address of the user' })
  @Prop()
  address: string;

  @ApiProperty({ description: 'Description of the user' })
  @Prop()
  description: string;

  @ApiProperty({ type: User })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, autopopulate: true }) // One-to-One relation
  user: User;

  @ApiProperty({ type: [History], description: 'History of changes to the profile' })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'History', autopopulate: true }] }) // One-to-Many relation with History
  history: Types.ObjectId[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
ProfileSchema.plugin(require('mongoose-autopopulate'));
