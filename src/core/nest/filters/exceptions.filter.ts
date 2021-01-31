import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpServer,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { FriendlyHttpException } from '../exceptions';
import { ValidationException } from '../exceptions/validation.exception';
import { ValidationError } from '../interfaces';

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter {
  constructor(applicationRef?: HttpServer) {
    super(applicationRef);
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof FriendlyHttpException) {
      const status = exception.getStatus();
      const friendlyStatus = exception.friendlyStatus;
      const apiResponse = this.getApiResponse([
        { status: friendlyStatus, message: exception.message, property: exception.property },
      ]);
      response.status(status).json(apiResponse);
      return;
    }

    if (exception instanceof ValidationException) {
      const statusCode = exception.getStatus();
      const apiResponse = this.getApiResponse(exception.errors);

      response.status(statusCode).json(apiResponse);
      return;
    }

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const apiResponse = this.getApiResponse([
        { message: exception.message, property: [] },
      ]);
      response.status(statusCode).json(apiResponse);
      return;
    }

    if (this.isHttpException(exception)) {
      const statusCode = exception.getStatus();
      const apiResponse = this.getApiResponse([
        { message: exception.message, property: [] },
      ]);
      response.status(statusCode).json(apiResponse);
      return;
    }
  }

  private getApiResponse(errors: ValidationError[]) {
    return {
      errors,
    };
  }

  private isHttpException(exception: unknown): exception is HttpException {
    const e = exception as HttpException;
    return e.getStatus !== undefined && e.message !== undefined;
  }
}
