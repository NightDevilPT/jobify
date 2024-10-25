import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { UserType } from 'src/common/interfaces/common.interface';
import { Profile } from 'src/modules/profile/entities/profile.entity';


@Schema({ timestamps: true })
export class User extends Document {
  @ApiProperty({ description: 'Username of the user' })
  @Prop({ required: true, unique: true })
  username: string;

  @ApiProperty({ description: 'Email of the user' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ description: 'Password of the user' })
  @Prop({ required: true,select:false })
  password: string;

  @ApiProperty({ description: 'JWT token for the user' })
  @Prop({select:false})
  token: string;

  @ApiProperty({ description: 'Whether the user is verified' })
  @Prop({ default: false,select:false })
  isVerified: boolean;

  @ApiProperty({ enum: UserType, description: 'Type of user (Recruiter or Candidate)' })
  @Prop({ enum: UserType, required: true })
  userType: UserType;

  @ApiProperty({ type: Profile })
  @Prop({ type: Types.ObjectId, ref: 'Profile', autopopulate: true }) // One-to-One Relation
  profile?: Profile;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(require('mongoose-autopopulate'));
