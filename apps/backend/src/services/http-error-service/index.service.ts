// http-error.service.ts
import { Injectable } from '@nestjs/common';
import { ErrorTypes } from 'src/interfaces/error.interface';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class HttpErrorService {
  throwError(errorType: ErrorTypes, context: string): void {
    const statusCode = this.getStatusCode(errorType);
    const message = `${context}: ${errorType}`;

    // Directly throw the exception here
    throw new HttpException(message, statusCode);
  }

  private getStatusCode(errorType: ErrorTypes): HttpStatus {
    switch (errorType) {
      case ErrorTypes.NotFound:
        return HttpStatus.NOT_FOUND;
      case ErrorTypes.Unauthorized:
        return HttpStatus.UNAUTHORIZED;
      case ErrorTypes.Forbidden:
        return HttpStatus.FORBIDDEN;
      case ErrorTypes.BadRequest:
        return HttpStatus.BAD_REQUEST;
      case ErrorTypes.InternalServerError:
        return HttpStatus.INTERNAL_SERVER_ERROR;
      case ErrorTypes.UnprocessableEntity:
        return HttpStatus.UNPROCESSABLE_ENTITY;
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR; // Default to 500 if not found
    }
  }
}
