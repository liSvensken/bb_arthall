import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { PaintingsApiService } from '@common/services/api/paintings-api.service';
import { PaintingResponse } from '@common/interfaces/api/paintings/paintings-list-response.interface';
import { MyCookiesService } from '@common/services/my-cookies.service';
import { PaintingSliderService } from '@common/services/painting-slider.service';
import { IsBrowserService } from '@common/services/is-browser.service';

@Injectable()
export class PaintingsSliderPageResolve implements Resolve<PaintingResponse[]> {
  constructor(private readonly _paintingsApi: PaintingsApiService,
              private readonly _myCookiesService: MyCookiesService,
              private readonly _paintingSliderService: PaintingSliderService,
              private readonly _isBrowser: IsBrowserService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<PaintingResponse[]> | PaintingResponse[] {
    const paintingsList = this._paintingSliderService.getPaintingsList();
    if (paintingsList.length) {
      return paintingsList;
    } else {
      if (this._isBrowser.isBrowser) {
        return this._myCookiesService.token$
          .pipe(
            take(1),
            filter(token => !!token),
            switchMap(() => {
              return this._paintingsApi.getPaintingsList()
                .pipe(
                  take(1),
                  tap(paintingList => this._paintingSliderService.setPaintingsList(paintingList))
                );
            }),
            catchError(() => of(null))
          );
      } else {
        return this._paintingsApi.getPaintingsListWithoutToken()
          .pipe(
            tap(paintingList => this._paintingSliderService.setPaintingsList(paintingList)),
            catchError(() => of(null))
          );
      }
    }
  }
}
