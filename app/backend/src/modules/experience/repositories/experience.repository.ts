// File: src/modules/experience/repositories/experience.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Experience } from '../entities/experience.entity';
import { BaseRepository } from 'src/common/repositories/base.repository';

@Injectable()
export class ExperienceRepository extends BaseRepository<Experience> {
  constructor(
    @InjectModel(Experience.name) private readonly experienceModel: Model<Experience>,
  ) {
    super(experienceModel);
  }

  async createExperience(data: Partial<Experience>): Promise<Experience> {
    const experience = new this.experienceModel(data);
    return await experience.save();
  }

  async updateExperience(
    experienceId: Types.ObjectId,
    updateData: Partial<Experience>,
  ): Promise<Experience | null> {
    const updated = await this.experienceModel
      .findByIdAndUpdate(experienceId, updateData, { new: true })
      .exec();
    if (updated) {
      await updated.populate({
        path: 'profile',
        options: { autopopulate: false },
      });
    }
    return updated;
  }

  async deleteExperience(experienceId: Types.ObjectId): Promise<boolean> {
    const result = await this.experienceModel.findByIdAndDelete(experienceId).exec();
    return !!result;
  }

  async getExperiencesByProfileId(profileId: Types.ObjectId): Promise<Experience[]> {
    return this.experienceModel
      .find({ profile: profileId })
      .select('title company location startDate endDate isCurrent description technologies')
      .lean()
      .exec();
  }
}
