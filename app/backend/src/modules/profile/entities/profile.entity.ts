import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';
import { Gender } from 'src/common/interfaces/common.interface';
import { History } from 'src/modules/history/entities/history.entity';
import { Education } from 'src/modules/education/entities/education.entity';
import { Experience } from 'src/modules/experience/entities/experience.entity';
import { Company } from 'src/modules/company/entities/company.entity';

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

  @ApiProperty({ type: () => User, description: 'Associated user account' })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, autopopulate: false }) // One-to-One relation with User
  user: Types.ObjectId | User;

  @ApiProperty({ type: () => Company, description: 'Company associated with the profile' })
  @Prop({ type: Types.ObjectId, ref: 'Company', autopopulate: false }) // One-to-One relation with Company
  company?: Types.ObjectId | Company;

  @ApiProperty({ type: [Experience], description: 'List of experiences related to the profile' })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Experience', autopopulate: false }] })
  experiences?: Experience[];

  @ApiProperty({ type: [Education], description: 'List of education records related to the profile' })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Education', autopopulate: false }] })
  education?: Education[];

  @ApiProperty({ type: [History], description: 'History of changes to the profile' })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'History', autopopulate: false }] }) // One-to-Many relation with History
  history?: Types.ObjectId[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
ProfileSchema.plugin(require('mongoose-autopopulate'));
