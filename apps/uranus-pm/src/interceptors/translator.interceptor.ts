import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Request } from 'express';
import * as translations from '../i18n';

@Injectable()
export class TranslatorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const lang = req.header('i18n-lang') || 'en';
    const dictionary = translations[lang];


    return next
      .handle()
      .pipe(
        catchError((error) => {
          const { message, i18n } = error;
          const translatedError = {
            ...error,
            message: i18n ? dictionary[i18n] || i18n : message
          };
          delete translatedError.i18n;

          throw translatedError;
        })
      );
  }
}
