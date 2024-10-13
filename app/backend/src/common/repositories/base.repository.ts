import { Model, Document, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseRepository<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
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
