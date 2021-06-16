import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { ArtistResponse } from '@common/interfaces/api/artists/artist-response-full.interface';
import { ArtistsApiService } from '@common/services/api/artists-api.service';
import { MyCookiesService } from '@common/services/my-cookies.service';
import { ModalService } from '@common/services/modal/modal.service';

@Injectable()
export class ArtistPageResolve implements Resolve<ArtistResponse> {

  constructor(private readonly _artistsApiService: ArtistsApiService,
              private readonly _myCookiesService: MyCookiesService,
              private readonly _modalService: ModalService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ArtistResponse> {
    const artistName = route.params.artistName;
    return this._myCookiesService.token$
      .pipe(
        filter(token => !!token),
        take(1),
        switchMap(() => this._artistsApiService.getArtist(artistName).pipe(take(1))),
        catchError(() => of(null))
      );
  }
}
