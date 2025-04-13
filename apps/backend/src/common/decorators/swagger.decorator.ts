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
  paramName?: string;
  paramDescription?: string;
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

  // Add operation summary
  decorators.push(
    ApiOperation({
      summary: options.summary,
      description: options.description,
    }),
  );

  // Add response type
  if (options.responseType) {
    decorators.push(
      SwaggerResponse({
        status: options.status || 200,
        description: options.description || 'Operation successful',
        type: options.isArray ? [options.responseType] : options.responseType,
      }),
    );
  }

  // Add error responses
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

  // Add parameter if specified
  if (options.paramName) {
    decorators.push(
      ApiParam({
        name: options.paramName,
        description:
          options.paramDescription || `${options.paramName} identifier`,
      }),
    );
  }

  // Add query parameters if specified
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

  // Add authentication if specified
  if (options.auth) {
    decorators.push(ApiBearerAuth());
  }

  // Consumes (like multipart)
  decorators.push(ApiConsumes(options.consumes || SwaggerFormType.JSON));

  // Add request body if specified
  if (options.bodyType) {
    decorators.push(
      ApiBody({
        type: options.bodyType,
      }),
    );
  }

  return applyDecorators(...decorators);
}
