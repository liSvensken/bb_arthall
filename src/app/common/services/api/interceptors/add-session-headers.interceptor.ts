import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MyCookiesService } from '../../my-cookies.service';
import { EnvironmentService } from '../../environment.service';

@Injectable()
export class AddSessionHeadersInterceptor implements HttpInterceptor {

  constructor(private readonly _myCookiesService: MyCookiesService,
              private readonly _environmentService: EnvironmentService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const setHeaders = {} as any;

    const token = this._myCookiesService.getToken();
    if (token) {
      setHeaders.Authorization = `Bearer ${ token }`;
    }

    request = request.clone({ setHeaders });

    return next.handle(request);
  }
}

export const ADD_SESSION_HEADERS_INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: AddSessionHeadersInterceptor,
  multi: true
};
