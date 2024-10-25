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
        select: 'username email userType',
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
        select: 'username email userType',
        options: { autopopulate: false },
      });
    }

    return updatedProfile;
  }

  async findAllProfiles(
    filters: any,
    page: number,
    limit: number,
    populateUser = false, // New parameter to control population
  ): Promise<{ profiles: Profile[]; totalCount: number }> {
    const skip = (page - 1) * limit;
  
    // Fetch profiles with pagination
    const profiles = await this.profileModel.find(filters).skip(skip).limit(limit).exec();
    const totalCount = await this.profileModel.countDocuments(filters).exec();
  
    // Populate the 'user' field for each profile if populateUser is true
    if (populateUser) {
      // Use Promise.all to handle the asynchronous population of each profile
      const populatedProfiles = await Promise.all(
        profiles.map(profile => profile.populate({
          path: 'user',
          select: 'username email userType',
          options: { autopopulate: false },
        }))
      );
      
      return {
        profiles: populatedProfiles.map(profile => profile.toObject()),
        totalCount,
      };
    }
  
    // If no population is needed, just return the profiles as objects
    return {
      profiles: profiles.map(profile => profile.toObject()),
      totalCount,
    };
  }
  
}
