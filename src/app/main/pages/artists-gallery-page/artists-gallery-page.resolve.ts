import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { MyCookiesService } from '@common/services/my-cookies.service';
import { ArtistReducedResponseInterface } from '@common/interfaces/api/artists/artist-reduced.response.interface';
import { ArtistsApiService } from '@common/services/api/artists-api.service';

@Injectable()
export class ArtistsGalleryPageResolve implements Resolve<ArtistReducedResponseInterface[]> {
  constructor(private readonly _artistsApiService: ArtistsApiService,
              private readonly _myCookiesService: MyCookiesService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ArtistReducedResponseInterface[]> {
    return this._myCookiesService.token$
      .pipe(
        filter(token => !!token),
        take(1),
        switchMap(() => this._artistsApiService.getArtistsList()),
        catchError(() => of(null))
      );
  }
}
