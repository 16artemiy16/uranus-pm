import { of } from 'rxjs';
import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter extends BaseRpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { statusCode, message, i18n } = exception;

    return of(
      response
        .status(statusCode)
        .json({
          statusCode,
          message,
          i18n,
        })
    );
  }
}
