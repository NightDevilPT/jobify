import { Model, Document, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseRepository<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async findAll(
    filters: any = {}, // Filters for querying
    page: number = 1, // Pagination page
    limit: number = 10, // Pagination limit
    populateOptions: { path: string; select?: string } | null = null // Populate options
  ): Promise<{ data: T[]; totalCount: number }> {
    const skip = (page - 1) * limit;

    // Modify filters to ensure case-insensitive exact word match for string fields
    for (const key in filters) {
      if (typeof filters[key] === 'string') {
        // Apply case-insensitive exact word match
        filters[key] = { $regex: `\\b${filters[key]}\\b`, $options: 'i' };
      }
    }

    // Fetch data with pagination
    const query = this.model.find(filters).skip(skip).limit(limit);

    const data = await query.exec();
    const totalCount = await this.model.countDocuments(filters).exec();
    let populatedData;

    if (populateOptions) {
      populatedData = await Promise.all(
        data.map(profile => profile.populate({
          path: 'user',
          select: 'username email userType',
          options: { autopopulate: false },
        }))
      )
    }

    return { data: populatedData.map(item => item.toObject()), totalCount };
  }

  async findById(id: string | Types.ObjectId): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async create(data: any): Promise<T> {
    const createdDocument = new this.model(data);
    return createdDocument.save();
  }

  async update(id: string | Types.ObjectId, data: any): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string | Types.ObjectId): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
