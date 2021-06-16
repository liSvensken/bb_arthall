import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { MyCookiesService } from '@common/services/my-cookies.service';
import { BusinessApiService } from '@common/services/api/business-api.service';
import { BusinessListResponseInterface } from '@common/interfaces/api/business/business-list-response.interface';

@Injectable()
export class BusinessPageResolve implements Resolve<BusinessListResponseInterface> {
  constructor(private readonly _myCookiesService: MyCookiesService,
              private readonly _businessApiService: BusinessApiService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<BusinessListResponseInterface> {
    return this._myCookiesService.token$
      .pipe(
        filter(token => !!token),
        take(1),
        switchMap(() => this._businessApiService.getBusinessList()),
        catchError(() => of(null))
      );
  }
}
