import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Education } from '../entities/education.entity';
import { BaseRepository } from 'src/common/repositories/base.repository';
import { profile } from 'console';

@Injectable()
export class EducationRepository extends BaseRepository<Education> {
  constructor(
    @InjectModel(Education.name)
    private readonly educationModel: Model<Education>,
  ) {
    super(educationModel);
  }

  async updateEducation(
    educationId: Types.ObjectId,
    updateData: Partial<Education>,
  ): Promise<Education | null> {
    const updated = await this.educationModel
      .findByIdAndUpdate(educationId, updateData, { new: true })
      .exec();
    if (updated) {
      await updated.populate({
        path: 'profile',
        options: { autopopulate: false },
      });
    }

    return updated;
  }

  async deleteEducation(educationId: Types.ObjectId): Promise<boolean> {
    const result = await this.educationModel
      .findByIdAndDelete(educationId)
      .exec();
    return !!result;
  }

  async getEducationForProfile(profileId: Types.ObjectId): Promise<Education[]> {
    console.log(profileId.toString(), 'profileId');
    const educationRecords = await this.educationModel
      .find({ profile: profileId })
      .select('degree institution startDate endDate isCurrent') // Select only relevant fields
      .lean()
      .exec();
    console.log(Array.isArray(educationRecords), educationRecords);

  
    return educationRecords;
  }  
}
