import { Document } from 'mongoose';
import { Schema, Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export abstract class BaseEntity extends Document {
  @ApiProperty({ description: 'The unique identifier of the entity', example: '507f1f77bcf86cd799439011' })
  declare _id: string;

  @ApiProperty({ description: 'The date when the entity was created', example: '2023-01-01T00:00:00.000Z' })
  @Prop({ default: Date.now })
  createdAt: Date;

  @ApiProperty({ description: 'The date when the entity was last updated', example: '2023-01-01T00:00:00.000Z' })
  @Prop({ default: Date.now })
  updatedAt: Date;

  @ApiProperty({ description: 'Whether the entity is deleted', example: false })
  @Prop({ default: false })
  isDeleted?: boolean;

  @ApiProperty({ description: 'The date when the entity was deleted', example: null })
  @Prop({ default: null })
  deletedAt?: Date;

  @ApiProperty({ description: 'The version key of the entity', example: 0 })
  declare __v: number;
} 