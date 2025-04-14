import {
  ApiOperation,
  ApiResponse as SwaggerResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export enum SwaggerFormType {
  JSON = 'application/json',
  MULTIPART_FORM = 'multipart/form-data',
  URL_ENCODED = 'application/x-www-form-urlencoded',
}

export interface SwaggerOptions {
  summary: string;
  description?: string;
  responseType?: any;
  status?: number;
  isArray?: boolean;

  // Added the `params` field to handle params in routes
  params?: Record<
    string,
    {
      description?: string;
      required?: boolean;
      type?: any;
    }
  >;

  queryParams?: Array<{
    name: string;
    required?: boolean;
    type?: any;
    enum?: any[];
    description?: string;
  }>;

  auth?: boolean;
  errorResponses?: Array<{
    status: number;
    description: string;
  }>;

  bodyType?: any;
  consumes?: SwaggerFormType;
}

export function SwaggerEndpoint(options: SwaggerOptions) {
  const decorators: any[] = [];

  decorators.push(
    ApiOperation({
      summary: options.summary,
      description: options.description,
    }),
  );

  if (options.responseType) {
    decorators.push(
      SwaggerResponse({
        status: options.status || 200,
        description: options.description || 'Operation successful',
        type: options.isArray ? [options.responseType] : options.responseType,
      }),
    );
  }

  if (options.errorResponses) {
    options.errorResponses.forEach((error) => {
      decorators.push(
        SwaggerResponse({
          status: error.status,
          description: error.description,
        }),
      );
    });
  }

  // Handle object-based route params
  if (options.params) {
    Object.entries(options.params).forEach(([name, meta]) => {
      decorators.push(
        ApiParam({
          name,
          description: meta.description || `${name} parameter`,
          required: meta.required ?? true,
          type: meta.type,
        }),
      );
    });
  }

  if (options.queryParams) {
    options.queryParams.forEach((param) => {
      decorators.push(
        ApiQuery({
          name: param.name,
          required: param.required || false,
          type: param.type,
          enum: param.enum,
          description: param.description,
        }),
      );
    });
  }

  if (options.auth) {
    decorators.push(ApiBearerAuth());
  }

  decorators.push(ApiConsumes(options.consumes || SwaggerFormType.JSON));

  if (options.bodyType) {
    decorators.push(ApiBody({ type: options.bodyType }));
  }

  return applyDecorators(...decorators);
}
