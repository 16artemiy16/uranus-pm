import { of } from 'rxjs';
import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import { Response } from 'express';
import * as translations from '../i18n';

@Catch()
export class AllExceptionsFilter extends BaseRpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse<Response>();

    const lang = request.header('i18n-lang') || 'en';
    const dictionary = translations[lang];

    const { statusCode, message, status } = exception;

    return of(
      response
        .status(statusCode || status)
        .json({
          statusCode: statusCode || status,
          message: dictionary[message] || message
        })
    );
  }
}
