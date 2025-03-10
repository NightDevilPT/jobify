import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BaseRepository } from 'src/common/repositories/base.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel
      .findOne({ email })
      .select('+password +isVerified') // Explicitly include the password and isVerified fields
      .exec();
  }

  async findByToken(token: string): Promise<User | null> {
    return this.userModel.findOne({ token }).exec();
  }

  async findUserWithProfile(
    userId: string | Types.ObjectId,
  ): Promise<User | null> {
    const userProfile = await this.userModel.findById(userId);

    return userProfile;
  }
}
