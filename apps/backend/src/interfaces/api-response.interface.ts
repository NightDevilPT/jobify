export interface ServiceResponse<T> {
  data: T;
  message?: string;
  meta?: Record<string, any>;
  statusCode?: number;
  accessToken?: string;
  refreshToken?: string;
}

export interface ApiResponse<T> {
  status: 'success';
  statusCode: number;
  message: string;
  data: T;
  meta?: {
    totalCount?: number;
    totalPages?: number;
    nextPage?: number | null;
    previousPage?: number | null;
    [key: string]: any;
  };
}

export interface ErrorResponse {
  status: 'error';
  statusCode: number;
  message: string;
  error?: string | Record<string, any>;
  data: null;
  meta: {
    timestamp: string;
    path: string;
  };
}
