import { Document } from 'mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { BaseEntity } from 'src/common/base/base.entity';

export type UserDocument = User & Document;

export enum UserType {
  CANDIDATE = 'CANDIDATE',
  RECRUITER = 'RECRUITER',
}

@Schema({ timestamps: true })
export class User extends BaseEntity {
  @ApiProperty({ example: 'john_doe', description: 'Username of the user' })
  @Prop({ required: true, unique: true, trim: true })
  username: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Email of the user',
  })
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @ApiProperty({
    example: 'hashedpassword123',
    description: 'Hashed password of the user',
  })
  @ApiHideProperty()
  @Prop({ required: true })
  password: string;

  @ApiProperty({
    example: 'jwt_token_string',
    description: 'Auth token for the user (optional)',
  })
  @Prop({ default: null })
  token?: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if the user is verified',
  })
  @Prop({ default: false })
  isVerified: boolean;

  @ApiProperty({
    example: UserType.CANDIDATE,
    enum: UserType,
    description: 'Type of user - Candidate or Recruiter',
  })
  @Prop({ type: String, enum: UserType, required: true })
  userType: UserType;

  @ApiProperty({
    example: false,
    description: 'Indicates if the user is an admin',
  })
  @Prop({ default: false })
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
