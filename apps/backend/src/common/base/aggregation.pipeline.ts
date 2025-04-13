// src/repositories/aggregation.pipeline.ts
import { PipelineStage } from 'mongoose';

/**
 * Interface defining the contract for building MongoDB aggregation pipelines
 * Provides methods to create essential aggregation stages
 */
export interface IAggregationPipeline<T> {
  /**
   * Creates a $lookup stage to perform a left join with another collection
   * @param from - The collection to join with
   * @param localField - Field from the current collection to match on
   * @param foreignField - Field from the 'from' collection to match against
   * @param as - Name of the output array field
   * @returns A $lookup stage
   */
  createLookup(
    from: string,
    localField: string,
    foreignField: string,
    as: string,
  ): PipelineStage.Lookup;

  /**
   * Creates a $match stage to filter documents
   * @param filter - Query criteria to match documents
   * @returns A $match stage
   */
  createMatch(filter: Record<string, any>): PipelineStage.Match;

  /**
   * Creates a $group stage to group documents by specified fields
   * @param group - Grouping criteria and accumulator operations
   * @returns A $group stage
   */
  createGroup(group: Record<string, any>): PipelineStage.Group;

  /**
   * Creates a $project stage to reshape documents
   * @param fields - Fields to include (1) or exclude (0)
   * @returns A $project stage
   */
  createProject(fields: Record<string, 1 | 0>): PipelineStage.Project;

  /**
   * Creates a $sort stage to order documents
   * @param sort - Sort criteria (1 for ascending, -1 for descending)
   * @returns A $sort stage
   */
  createSort(sort: Record<string, 1 | -1>): PipelineStage.Sort;

  /**
   * Creates a $skip and $limit stage for pagination
   * @param skip - Number of documents to skip
   * @param limit - Maximum number of documents to return
   * @returns Array of $skip and $limit stages
   */
  createPagination(skip: number, limit: number): [PipelineStage.Skip, PipelineStage.Limit];

  /**
   * Builds and returns the complete aggregation pipeline
   * @returns Array of pipeline stages
   */
  buildPipeline(): PipelineStage[];

  /**
   * Clears all stages from the pipeline
   */
  clear(): void;
}

/**
 * Implementation of the aggregation pipeline builder
 * Provides methods to create and chain MongoDB aggregation stages
 */
export class AggregationPipeline<T> implements IAggregationPipeline<T> {
  private stages: PipelineStage[] = [];

  /**
   * Creates a $lookup stage to perform a left join with another collection
   * @param from - The collection to join with
   * @param localField - Field from the current collection to match on
   * @param foreignField - Field from the 'from' collection to match against
   * @param as - Name of the output array field
   * @returns A $lookup stage
   */
  createLookup(
    from: string,
    localField: string,
    foreignField: string,
    as: string,
  ): PipelineStage.Lookup {
    const stage: PipelineStage.Lookup = {
      $lookup: {
        from,
        localField,
        foreignField,
        as,
      },
    };
    this.stages.push(stage);
    return stage;
  }

  /**
   * Creates a $match stage to filter documents
   * @param filter - Query criteria to match documents
   * @returns A $match stage
   */
  createMatch(filter: Record<string, any>): PipelineStage.Match {
    const stage: PipelineStage.Match = {
      $match: filter,
    };
    this.stages.push(stage);
    return stage;
  }

  /**
   * Creates a $group stage to group documents by specified fields
   * @param group - Grouping criteria and accumulator operations
   * @returns A $group stage
   */
  createGroup(group: Record<string, any>): PipelineStage.Group {
    const stage: PipelineStage.Group = {
      $group: group,
    };
    this.stages.push(stage);
    return stage;
  }

  /**
   * Creates a $project stage to reshape documents
   * @param fields - Fields to include (1) or exclude (0)
   * @returns A $project stage
   */
  createProject(fields: Record<string, 1 | 0>): PipelineStage.Project {
    const stage: PipelineStage.Project = {
      $project: fields,
    };
    this.stages.push(stage);
    return stage;
  }

  /**
   * Creates a $sort stage to order documents
   * @param sort - Sort criteria (1 for ascending, -1 for descending)
   * @returns A $sort stage
   */
  createSort(sort: Record<string, 1 | -1>): PipelineStage.Sort {
    const stage: PipelineStage.Sort = {
      $sort: sort,
    };
    this.stages.push(stage);
    return stage;
  }

  /**
   * Creates a $skip and $limit stage for pagination
   * @param skip - Number of documents to skip
   * @param limit - Maximum number of documents to return
   * @returns Array of $skip and $limit stages
   */
  createPagination(skip: number, limit: number): [PipelineStage.Skip, PipelineStage.Limit] {
    const skipStage: PipelineStage.Skip = { $skip: skip };
    const limitStage: PipelineStage.Limit = { $limit: limit };
    
    this.stages.push(skipStage, limitStage);
    return [skipStage, limitStage];
  }

  /**
   * Builds and returns the complete aggregation pipeline
   * @returns Array of pipeline stages
   */
  buildPipeline(): PipelineStage[] {
    return this.stages;
  }

  /**
   * Clears all stages from the pipeline
   */
  clear(): void {
    this.stages = [];
  }
}
