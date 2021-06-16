import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { MyCookiesService } from '@common/services/my-cookies.service';
import { TopArtistsResponseInterface } from '@common/interfaces/api/artists/top-artists-response.interface';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { ArtistsApiService } from '@common/services/api/artists-api.service';

@Injectable()
export class TopArtistsPageResolve implements Resolve<TopArtistsResponseInterface[]> {
  constructor(private readonly _artistsApiService: ArtistsApiService,
              private readonly _myCookiesService: MyCookiesService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<TopArtistsResponseInterface[]> {
    return this._myCookiesService.token$
      .pipe(
        filter(token => !!token),
        take(1),
        switchMap(() => this._artistsApiService.getTopArtists().pipe(take(1))),
        catchError(() => of(null))
      );
  }
}
