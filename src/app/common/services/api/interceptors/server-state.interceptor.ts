import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IsBrowserService } from '../../is-browser.service';

@Injectable()
export class ServerStateInterceptor implements HttpInterceptor {
  constructor(private readonly _transferState: TransferState,
              private readonly _isBrowserService: IsBrowserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this._isBrowserService.isBrowser) {
      return next.handle(req).pipe(
        tap(response => {
          if (response instanceof HttpResponse) {
            this._transferState.set(makeStateKey(req.url), response);
          }
        }),
      );
    }

    return next.handle(req);
  }
}

export const SERVER_STATE_INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: ServerStateInterceptor,
  multi: true
};
