import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaintingsChangeRating } from '../../interfaces/api/paintings/paintings-change-rating.interface';
import { PaintingResponse } from '../../interfaces/api/paintings/paintings-list-response.interface';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../environment.service';
import { RatingEnum } from '../../enums/rating.enum';
import { TopPaintingsResponseInterface } from '@common/interfaces/api/paintings/top-paintings-response.interface';
import { SetViewedResponseInterface } from '@common/interfaces/api/paintings/set-viewed-response.interface';

@Injectable({ providedIn: 'root' })
export class PaintingsApiService {
  constructor(private readonly _httpClient: HttpClient,
              private readonly _environmentService: EnvironmentService) {
  }

  getPaintingsList(): Observable<PaintingResponse[]> {
    return this._httpClient.get<PaintingResponse[]>(
      `${ this._environmentService.environment.apiBaseUrl }/api/v3/paintings/list`
    );
  }

  getPaintingsListWithoutToken(): Observable<PaintingResponse[]> {
    return this._httpClient.get<PaintingResponse[]>(
      `${ this._environmentService.environment.apiBaseUrl }/api/v3/paintings/web-list`
    );
  }

  changeRating(painting: number, rate: RatingEnum): Observable<PaintingsChangeRating> {
    return this._httpClient.patch<PaintingsChangeRating>(
      `${ this._environmentService.environment.apiBaseUrl }/api/v3/paintings/${ painting }/set-rate`,
      { rate }
    );
  }

  getTopPaintings(): Observable<TopPaintingsResponseInterface[]> {
    return this._httpClient.get<TopPaintingsResponseInterface[]>(
      `${ this._environmentService.environment.apiBaseUrl }/api/v3/paintings/top`
    );
  }

  setViewed(paintingId: number): Observable<SetViewedResponseInterface> {
    return this._httpClient.post<SetViewedResponseInterface>(
      `${ this._environmentService.environment.apiBaseUrl }/api/v3/paintings/${ paintingId }/set-viewed`,
      {}
    );
  }
}
