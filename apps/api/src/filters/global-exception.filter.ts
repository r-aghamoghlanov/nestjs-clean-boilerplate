import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ZodValidationException } from 'nestjs-zod';
import { LoggerRegistry } from '@package/core/common/logger/logger-registry';
import { MessageCodeError } from '@package/core/common/errors/message-code.error';
import { Language } from '@package/core/common/language.constant';
import { HttpStatus } from '@package/core/common/errors/error-statuses.constant';

type ErrorStruct = {
  message: string;
  statusCode: number;
  statusText: string;
  details: Record<string, unknown>[];
};

type ErrorResponsePayload = {
  statusCode: number;
  timestamp: string;
  meta: {
    path: string;
  };
  params: {
    [key: string]: string;
  };
  error: ErrorStruct;
};

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = LoggerRegistry.createLogger(
    GlobalExceptionFilter.name,
  );

  public catch(exception: Error, host: ArgumentsHost) {
    const hostType = host.getType();

    if (hostType === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();

      const responsePayload = this.prepareResponsePayload(exception, request);
      this.logger.error('Exception occurred', {
        ...responsePayload,
        error: {
          ...responsePayload.error,
          stack: exception.stack,
        },
      });
      return response.status(responsePayload.statusCode).json(responsePayload);
    }
    // TODO: Implement ws, rpc, etc.
    else if (hostType === 'ws') {
      return;
    } else if (hostType === 'rpc') {
      return;
    }
  }

  private prepareResponsePayload(exception: Error, request: Request) {
    const status = this.getStatus(exception);
    const statusText =
      Object.values(HttpStatus).find((s) => s.code === status)?.description ??
      'Error with unknown status';
    const errorMessage = exception.message;

    const responsePayload: ErrorResponsePayload = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      meta: { path: request.url },
      params: request.params,
      error: {
        message: errorMessage,
        statusCode: status,
        statusText,
        details: [],
      },
    };

    if (exception instanceof MessageCodeError) {
      /** MessageCodeError, Set all header variable to
       * have a context for the client in case of MessageCodeError.
       */
      const language =
        (request.headers['accept-language'] as Language) || Language.EN;

      const localizedErrorMessage = MessageCodeError.localize(
        exception,
        language,
      );
      responsePayload.statusCode = exception.statusCode;
      responsePayload.error.message = localizedErrorMessage;
      responsePayload.error.details = exception.errorData
        ? [exception.errorData]
        : [];
    } else if (exception instanceof ZodValidationException) {
      responsePayload.statusCode = exception.getStatus();
      responsePayload.error.message = exception.message;
      responsePayload.error.details = exception
        .getZodError()
        .errors.map((e) => ({
          path: e.path.join('.'),
          message: e.message,
        }));
    }

    return responsePayload;
  }

  private getStatus(exception: Error): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }

    if (exception instanceof ZodValidationException) {
      return exception.getStatus();
    }

    if (exception instanceof MessageCodeError) {
      return exception.statusCode;
    }

    return HttpStatus.INTERNAL_SERVER_ERROR.code;
  }
}
