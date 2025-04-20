// Standard API response for successful operations
export interface ApiResponse<T> {
  status: string;
  statusCode: number;
  message: string;
  data: T | T[] | null;
  meta?: Record<string, any>;
}

// Standardized error response
export interface ErrorResponse {
  status: 'error';
  statusCode: number;
  message: string;
  error?: string | Record<string, any>;
  data: null;
  meta: {
    timestamp: string;
    path: string;
    [key: string]: any; // Allow for additional meta fields
  };
}

// Helper type for repository methods
export interface FindOptions {
  select?: string[];
  relations?: string[];
  where?: Record<string, any>;
  order?: Record<string, 'ASC' | 'DESC'>;
  skip?: number;
  take?: number;
}

// Base repository interface that can be implemented by your repositories
export interface BaseRepository<T> {
  findAll(options?: FindOptions): Promise<T[]>;
  findById(id: string | number): Promise<T | null>;
  findByField(field: string, value: any): Promise<T | null>;
  findOneWhere(conditions: Record<string, any>): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: string | number, data: Partial<T>): Promise<T>;
  delete(id: string | number): Promise<boolean>;
}