import { Model, Document, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseRepository<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async findAll(
    filters: any = {},
    page: number = 1,
    limit: number = 10,
    populateOptions: { path: string; select?: string } | null = null,
    sortOptions: Record<string, 1 | -1> = { createdAt: -1 } // Default to sort by `createdAt` descending
  ): Promise<{ data: any[]; totalCount: number }> {
    const skip = (page - 1) * limit;
  
    // Apply case-insensitive exact word match for string filters
    for (const key in filters) {
      if (typeof filters[key] === 'string') {
        filters[key] = { $regex: `\\b${filters[key]}\\b`, $options: 'i' };
      }
    }
  
    // Build the query with pagination and sorting
    let query = this.model.find(filters).skip(skip).limit(limit).lean();
  
    if (sortOptions) {
      query = query.sort(sortOptions);
    }
  
    if (populateOptions) {
      query = query.populate(populateOptions);
    }
  
    const data = await query.exec();
    const totalCount = await this.model.countDocuments(filters).exec();
    return { data, totalCount };
  }
  

  async findById(id: string | Types.ObjectId, populateOptions: { path: string; select?: string } | null = null): Promise<any | null> {
    let query = this.model.findById(id).lean();

    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    const document = await query.exec();

    return document || null;
  }

  async create(data: any, populateOptions: { path: string; select?: string } | null = null): Promise<any> {
    const createdDocument = new this.model(data);
    let savedDocument = await createdDocument.save();

    if (populateOptions) {
      savedDocument = await savedDocument.populate(populateOptions);
    }

    return savedDocument.toObject();
  }

  async update(id: string | Types.ObjectId, data: any, populateOptions: { path: string; select?: string } | null = null): Promise<any | null> {
    let query = this.model.findByIdAndUpdate(id, data, { new: true }).lean();

    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    const updatedDocument = await query.exec();

    return updatedDocument || null;
  }

  async delete(id: string | Types.ObjectId): Promise<any | null> {
    const deletedDocument = await this.model.findByIdAndDelete(id).lean().exec();

    return deletedDocument || null;
  }
}
