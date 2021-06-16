import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { MyCookiesService } from '@common/services/my-cookies.service';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { TopPaintingsResponseInterface } from '@common/interfaces/api/paintings/top-paintings-response.interface';
import { PaintingsApiService } from '@common/services/api/paintings-api.service';

@Injectable()
export class TopPaintingsPageResolve implements Resolve<TopPaintingsResponseInterface[]> {
  constructor(private readonly _paintingsApiService: PaintingsApiService,
              private readonly _myCookiesService: MyCookiesService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<TopPaintingsResponseInterface[]> {
    return this._myCookiesService.token$
      .pipe(
        filter(token => !!token),
        take(1),
        switchMap(() => this._paintingsApiService.getTopPaintings().pipe(take(1))),
        catchError(() => of(null))
      );
  }
}
