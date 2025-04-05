// meta.interface.ts
export interface MetaData {
  currentPage?: number;
  previousPage?: number | null;
  nextPage?: number | null;
  totalPage?: number;
  totalData?: number;
  [key: string]: any; // Allow additional dynamic fields
}
export interface ServiceResponse<T> {
  data: T;
  message?: string;
  meta?: MetaData;
  statusCode?: number;
  accessToken?: string;
  refreshToken?: string;
}

export interface ApiResponse<T> {
  status: 'success';
  statusCode: number;
  message: string;
  data: T;
  meta?: MetaData & {
    timeTakenMs?: number;
    timestamp?: string;
    path?: string;
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
