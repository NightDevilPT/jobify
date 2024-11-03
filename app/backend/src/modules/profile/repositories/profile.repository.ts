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

  // Retrieve a profile by its ID
  async findProfileById(
    profileId: Types.ObjectId,
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
    profileId: Types.ObjectId,
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
  ): Promise<{ data: Profile[]; totalCount: number }> {
    const populateOptions = populateUser
      ? {
          path: 'user',
          select: 'username email userType',
          options: { autopopulate: false },
        }
      : null;

    return super.findAll(filters, page, limit, populateOptions);
  }

  async findProfileEducationByUserId(
    userId: Types.ObjectId,
  ): Promise<Partial<Profile> | null> {
    const profile = await this.profileModel
      .findOne({ user: userId })
      .populate({
        path: 'education',
        model: 'Education',
        select: 'degree institution startDate endDate isCurrent',
      })
      .select('-user')
      .lean()
      .exec();

    return profile ? profile : null;
  }

   async findProfileByUserId(
    userId: Types.ObjectId,
    populatePaths: string[] = [],
  ): Promise<Profile | null> {
    const query = this.profileModel.findOne({ user: userId });

    // Apply population for requested paths only
    if (populatePaths && populatePaths.length > 0) {
      populatePaths.forEach((path) => {
        query.populate({
          path: path,
          model: path === 'education' ? 'Education' : undefined,
          options: { autopopulate: false, strictPopulate: false },
        });
      });
    }

    return query.lean().exec();
  }
}
