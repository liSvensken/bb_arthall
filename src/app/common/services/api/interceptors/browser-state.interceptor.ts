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
import { Observable, of } from 'rxjs';
import { IsBrowserService } from '../../is-browser.service';

@Injectable({
  providedIn: 'root'
})
export class BrowserStateInterceptor implements HttpInterceptor {
  constructor(private readonly _transferState: TransferState,
              private readonly _isBrowserService: IsBrowserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const transferStateKey = makeStateKey(req.url);
    if (this._transferState.hasKey(transferStateKey)) {
      const storedResponse: HttpResponse<any> = this._transferState.get(transferStateKey, null);
      this._transferState.remove(transferStateKey);
      const response = new HttpResponse({
        body: storedResponse.body,
        headers: storedResponse.headers,
        status: storedResponse.status,
        statusText: storedResponse.statusText,
        url: storedResponse.url
      });
      return of(response);
    }

    return next.handle(req);
  }
}

export const BROWSER_STATE_INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: BrowserStateInterceptor,
  multi: true
};
