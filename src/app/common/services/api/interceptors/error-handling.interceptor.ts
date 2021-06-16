import { Injectable } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, of, timer } from 'rxjs';
import { catchError, mergeMap, retryWhen, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PageNameEnum } from '@common/enums/page-name.enum';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  retryDelay = 2000;
  retryMaxAttempts = 2;

  constructor(private readonly _router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retryWhen(errors => {
        return errors
          .pipe(
            mergeMap((err, count) => {
              if (count === this.retryMaxAttempts) {
                return next.handle(request)
                  .pipe(
                    catchError(event => {
                      if (event instanceof HttpErrorResponse) {
                        // 404 для CORS
                        const errorCode = event.status || 500;
                        this._router.navigate([`/${ PageNameEnum.Error }`, errorCode]);
                      }
                      return of(event);
                    })
                  );
              }
              return of(err)
                .pipe(
                  tap(error => console.log(`Retrying ${ error.method + '' + error.url }. Retry count ${ count + 1 }`)),
                  mergeMap(() => timer(this.retryDelay))
                );
            })
          );
      })
    );
  }
}

export const ERROR_HANDLING_INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorHandlingInterceptor,
  multi: true
};
