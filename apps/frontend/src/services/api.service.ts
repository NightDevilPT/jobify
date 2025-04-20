import { EnvConfig } from '@/config/env';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Types for API responses
interface SuccessResponse<T> {
  status: 'success';
  statusCode: number;
  message: string;
  data: T;
  meta: {
    timeTakenMs: number;
    timestamp: string;
    path: string;
  };
}

interface ErrorResponse {
  status: 'error';
  statusCode: number;
  message: string;
  error?: any;
  data: null;
  meta: {
    timestamp: string;
    path: string;
  };
}

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

// Configuration types
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type DataType = 'json' | 'form-data';

interface ApiRequestConfig extends AxiosRequestConfig {
  dataType?: DataType;
  withCredentials?: boolean;
}

// Get base URL from environment variables
const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    return EnvConfig.baseUrl || 'http://localhost:3000/api';
  }
  return EnvConfig.baseUrl || 'http://localhost:3000/api';
};

// Create axios instance with interceptors
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: getBaseURL(),
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // This is important for cookies to be sent/received
  });

  // Response interceptor
  instance.interceptors.response.use(
    (response) => {
      // No need to manually set cookies, the browser will handle cookies
      // from the response automatically
      return response;
    },
    (error: AxiosError<ErrorResponse>) => {
      // Handle errors
      if (error.response?.status === 401) {
        // Handle unauthorized access
        // No need to manually delete cookies, let the server handle this
        // Optionally redirect to login
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
      }

      // Convert to standard error format
      const apiError = {
        status: 'error',
        statusCode: error.response?.status || 500,
        message: error.response?.data?.message || 'An unexpected error occurred',
        error: error.response?.data?.error,
        data: null,
        meta: {
          timestamp: new Date().toISOString(),
          path: error.config?.url || '',
        },
      };

      return Promise.reject(apiError);
    }
  );

  return instance;
};

const axiosInstance = createAxiosInstance();

// Core request function
const makeRequest = async <T>(
  method: HttpMethod,
  url: string,
  data?: any,
  config: ApiRequestConfig = {}
): Promise<SuccessResponse<T>> => {
  const { dataType = 'json', withCredentials = true, ...restConfig } = config;

  let requestData = data;
  if (dataType === 'form-data' && data) {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    requestData = formData;
    restConfig.headers = {
      ...restConfig.headers,
      'Content-Type': 'multipart/form-data',
    };
  }

  const response = await axiosInstance.request<SuccessResponse<T>>({
    method,
    url,
    data: requestData,
    withCredentials,
    ...restConfig,
  });

  return response.data;
};

// API methods
export const apiService = {
  get: <T>(url: string, config?: ApiRequestConfig) => 
    makeRequest<T>('GET', url, undefined, config),

  getAll: <T>(url: string, params?: any, config?: ApiRequestConfig) =>
    makeRequest<T>('GET', url, undefined, { ...config, params }),

  post: <T>(url: string, data?: any, config?: ApiRequestConfig) =>
    makeRequest<T>('POST', url, data, config),

  put: <T>(url: string, data?: any, config?: ApiRequestConfig) =>
    makeRequest<T>('PUT', url, data, config),

  delete: <T>(url: string, config?: ApiRequestConfig) =>
    makeRequest<T>('DELETE', url, undefined, config),

  patch: <T>(url: string, data?: any, config?: ApiRequestConfig) =>
    makeRequest<T>('PATCH', url, data, config),

  upload: <T>(url: string, file: File, fieldName = 'file', additionalData?: any) => {
    const formData = new FormData();
    formData.append(fieldName, file);
    
    if (additionalData) {
      for (const key in additionalData) {
        formData.append(key, additionalData[key]);
      }
    }

    return makeRequest<T>('POST', url, formData, {
      dataType: 'form-data',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// Utility type for API response data
export type ApiData<T> = T extends SuccessResponse<infer U> ? U : never;