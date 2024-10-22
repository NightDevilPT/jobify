import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/common/repositories/base.repository';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class ProfileRepository extends BaseRepository<Profile> {
  constructor(
    @InjectModel(Profile.name) private readonly profileModel: Model<Profile>,
  ) {
    super(profileModel);
  }

  // Retrieve a profile by its ID
  async findProfileById(
    profileId: string,
    populateUser = false,
  ): Promise<Profile | null> {
    const profile = await this.profileModel.findById(profileId).exec();

    if (populateUser && profile) {
      await profile.populate({
        path: 'user',
        select: 'username email',
        options: { autopopulate: false },
      });
    }

    return profile ? profile.toObject() : null;
  }

  // Update a profile and optionally populate the user without causing recursion
  async updateProfile(
    profileId: string,
    updateData: Partial<Profile>,
    populateUser = false,
  ): Promise<Profile | null> {
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
