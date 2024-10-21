import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BaseRepository } from 'src/common/repositories/base.repository';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class ProfileRepository extends BaseRepository<Profile> {
  constructor(
    @InjectModel(Profile.name) private readonly profileModel: Model<Profile>,
  ) {
    super(profileModel);
  }

  // Find a profile by profile ID
  async findProfileById(profileId: string, populateUser = false): Promise<Profile | null> {
    const query = this.profileModel.findById(profileId);

    if (populateUser) {
      query.populate({
        path: 'user',
        select: 'username email',
        options: { autopopulate: false },
      });
    }

    return query.exec();
  }

  // Update profile and populate user without profile recursion
  async updateProfile(profileId: string, updateData: Partial<Profile>, populateUser = false): Promise<Profile | null> {
    const updatedProfile = await this.profileModel
      .findByIdAndUpdate(profileId, updateData, { new: true })
      .exec();

    if (populateUser && updatedProfile) {
      await updatedProfile.populate({
        path: 'user',
        select: 'username email',
        options: { autopopulate: false },
      });
    }

    return updatedProfile;
  }
}
