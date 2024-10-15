import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
  ForbiddenException,
  ConflictException,
  GoneException,
  ImATeapotException,
  MethodNotAllowedException,
  NotAcceptableException,
  RequestTimeoutException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';

@Injectable()
export class ErrorService {
  throwNotFoundError(message: string): void {
    throw new NotFoundException(message);
  }

  throwBadRequestError(message: string): void {
    throw new BadRequestException(message);
  }

  throwInternalServerError(message: string): void {
    throw new InternalServerErrorException(message);
  }

  throwUnauthorizedError(message: string): void {
    throw new UnauthorizedException(message);
  }

  throwForbiddenError(message: string): void {
    throw new ForbiddenException(message);
  }

  throwConflictError(message: string): void {
    throw new ConflictException(message);
  }

  throwGoneError(message: string): void {
    throw new GoneException(message);
  }

  throwTeapotError(message: string): void {
    throw new ImATeapotException(message);
  }

  throwMethodNotAllowedError(message: string): void {
    throw new MethodNotAllowedException(message);
  }

  throwNotAcceptableError(message: string): void {
    throw new NotAcceptableException(message);
  }

  throwRequestTimeoutError(message: string): void {
    throw new RequestTimeoutException(message);
  }

  throwUnsupportedMediaTypeError(message: string): void {
    throw new UnsupportedMediaTypeException(message);
  }
}
