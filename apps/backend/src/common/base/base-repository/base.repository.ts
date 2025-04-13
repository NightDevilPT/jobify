import { Injectable } from '@nestjs/common';
import { Model, Document, FilterQuery, SortOrder } from 'mongoose';

import { AggregationPipeline } from '../aggregation.pipeline';
import { ErrorTypes } from 'src/interfaces/error.interface';
import { FindOptions } from 'src/interfaces/api-response.interface';
import { HttpErrorService } from 'src/services/http-error-service/index.service';

/**
 * Type definition for the BaseRepository
 * This type represents the structure and return types of all methods in the BaseRepository class
 */
export type BaseRepositoryType<T extends Document> = {
  // Create a new document
  create(data: Partial<T>): Promise<T>;

  // Find all documents with optional filtering, sorting, and pagination
  findAll(options?: FindOptions): Promise<T[]>;

  // Find a document by its ID
  findById(id: string): Promise<T>;

  // Find a document by a specific field and value
  findByField(field: string, value: any): Promise<T>;

  // Find a document by multiple conditions
  findOneWhere(conditions: Record<string, any>): Promise<T>;

  // Update a document by its ID
  update(id: string, data: Partial<T>): Promise<T>;

  // Delete a document by its ID
  delete(id: string): Promise<boolean>;

  // Soft delete a document by setting isDeleted flag
  softDelete(id: string): Promise<T>;

  // Count documents with optional filtering
  countDocuments(filter?: FilterQuery<T>): Promise<number>;

  // Perform aggregation pipeline
  aggregate<U>(pipeline: AggregationPipeline<T>): Promise<U[]>;
};

@Injectable()
export abstract class BaseRepository<T extends Document>
  implements BaseRepositoryType<T>
{
  constructor(
    protected readonly model: Model<T>,
    protected readonly httpErrorService: HttpErrorService,
  ) {}

  async create(data: Partial<T>): Promise<T> {
    try {
      const created = new this.model(data);
      const saved = await created.save();

      // Clean up the Mongoose document to return only the actual data
      const cleanData = saved.toObject ? saved.toObject() : saved;

      return cleanData as T;
    } catch (error) {
      console.log('Error creating resource:', error);
      this.httpErrorService.throwError(
        ErrorTypes.BadRequest,
        'Failed to create resource',
      );
      throw error; // This line will never be reached due to throwError
    }
  }

  async findAll(options?: FindOptions): Promise<T[]> {
    try {
      const query = this.model.find();

      if (options?.select) {
        query.select(options.select.join(' '));
      }

      if (options?.relations) {
        query.populate(options.relations);
      }

      if (options?.where) {
        query.where(options.where);
      }

      if (options?.order) {
        const sortOptions: { [key: string]: SortOrder } = {};
        Object.entries(options.order).forEach(([field, direction]) => {
          sortOptions[field] = direction === 'ASC' ? 1 : -1;
        });
        query.sort(sortOptions);
      }

      if (options?.skip) {
        query.skip(options.skip);
      }

      if (options?.take) {
        query.limit(options.take);
      }

      const data = await query.exec();
      return data as T[];
    } catch (error) {
      this.httpErrorService.throwError(
        ErrorTypes.InternalServerError,
        'Failed to retrieve resources',
      );
      throw error; // This line will never be reached due to throwError
    }
  }

  async findById(id: string): Promise<T> {
    try {
      const data = await this.model.findById(id).exec();
      if (!data) {
        this.httpErrorService.throwError(
          ErrorTypes.NotFound,
          'Resource not found',
        );
      }
      return data as T;
    } catch (error) {
      this.httpErrorService.throwError(
        ErrorTypes.InternalServerError,
        'Failed to retrieve resource',
      );
      throw error; // This line will never be reached due to throwError
    }
  }

  async findByField(field: string, value: any): Promise<T> {
    try {
      const data = await this.model
        .findOne({ [field]: value } as FilterQuery<T>)
        .exec();
      if (!data) {
        this.httpErrorService.throwError(
          ErrorTypes.NotFound,
          'Resource not found',
        );
      }
      return data as T;
    } catch (error) {
      this.httpErrorService.throwError(
        ErrorTypes.InternalServerError,
        'Failed to retrieve resource',
      );
      throw error; // This line will never be reached due to throwError
    }
  }

  async findOneWhere(conditions: Record<string, any>): Promise<T> {
    try {
      const data = await this.model.findOne(conditions).exec();
      if (!data) {
        this.httpErrorService.throwError(
          ErrorTypes.NotFound,
          'Resource not found',
        );
      }
      return data as T;
    } catch (error) {
      this.httpErrorService.throwError(
        ErrorTypes.InternalServerError,
        'Failed to retrieve resource',
      );
      throw error; // This line will never be reached due to throwError
    }
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    try {
      const updated = await this.model
        .findByIdAndUpdate(id, data, { new: true, runValidators: true })
        .exec();

      if (!updated) {
        this.httpErrorService.throwError(
          ErrorTypes.NotFound,
          'Resource not found',
        );
      }

      return updated as T;
    } catch (error) {
      this.httpErrorService.throwError(
        ErrorTypes.InternalServerError,
        'Failed to update resource',
      );
      throw error; // This line will never be reached due to throwError
    }
  }

  async delete(id: string): Promise<boolean | any> {
    try {
      const result = await this.model.findByIdAndDelete(id).exec();
      if (!result) {
        this.httpErrorService.throwError(
          ErrorTypes.NotFound,
          'Resource not found',
        );
      }
      return true;
    } catch (error) {
      this.httpErrorService.throwError(
        ErrorTypes.InternalServerError,
        'Failed to delete resource',
      );
    }
  }

  async softDelete(id: string): Promise<T> {
    try {
      const updated = await this.model
        .findByIdAndUpdate(
          id,
          { isDeleted: true, deletedAt: new Date() },
          { new: true },
        )
        .exec();

      if (!updated) {
        this.httpErrorService.throwError(
          ErrorTypes.NotFound,
          'Resource not found',
        );
      }

      return updated as T;
    } catch (error) {
      this.httpErrorService.throwError(
        ErrorTypes.InternalServerError,
        'Failed to soft delete resource',
      );
      throw error; // This line will never be reached due to throwError
    }
  }

  async countDocuments(filter: FilterQuery<T> = {}): Promise<number | any> {
    try {
      const count = await this.model.countDocuments(filter).exec();
      return count;
    } catch (error) {
      this.httpErrorService.throwError(
        ErrorTypes.InternalServerError,
        'Failed to count documents',
      );
      throw error; // This line will never be reached due to throwError
    }
  }

  async aggregate<U>(pipeline: AggregationPipeline<T>): Promise<U[]> {
    try {
      const stages = pipeline.buildPipeline();
      const data = await this.model.aggregate(stages).exec();
      return data;
    } catch (error) {
      this.httpErrorService.throwError(
        ErrorTypes.InternalServerError,
        'Failed to perform aggregation',
      );
      throw error; // This line will never be reached due to throwError
    }
  }
}
