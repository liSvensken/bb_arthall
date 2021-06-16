import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../environment.service';
import { ArtistReducedResponseInterface } from '@common/interfaces/api/artists/artist-reduced.response.interface';
import { ArtistResponse } from '@common/interfaces/api/artists/artist-response-full.interface';
import { TopArtistsResponseInterface } from '@common/interfaces/api/artists/top-artists-response.interface';
import { ArtistsJoinResponseInterface } from '@common/interfaces/api/artists/artists-join-response.interface';
import { ArtistsJoinRequestInterface } from '@common/interfaces/api/artists/artists-join-request.interface';

@Injectable({ providedIn: 'root' })
export class ArtistsApiService {
  constructor(private readonly _httpClient: HttpClient,
              private readonly _environmentService: EnvironmentService) {
  }

  getArtist(artistName: string): Observable<ArtistResponse> {
    return this._httpClient.get<ArtistResponse>(
      `${ this._environmentService.environment.apiBaseUrl }/api/v3/artists/${ artistName }`
    );
  }

  getArtistsList(): Observable<ArtistReducedResponseInterface[]> {
    return this._httpClient.get<ArtistReducedResponseInterface[]>(
      `${ this._environmentService.environment.apiBaseUrl }/api/v3/artists/list`
    );
  }

  getTopArtists(): Observable<TopArtistsResponseInterface[]> {
    return this._httpClient.get<TopArtistsResponseInterface[]>(
      `${ this._environmentService.environment.apiBaseUrl }/api/v3/artists/top`
    );
  }

  joinArtist(model: ArtistsJoinRequestInterface): Observable<ArtistsJoinResponseInterface> {
    return this._httpClient.post<ArtistsJoinResponseInterface>(
      `${ this._environmentService.environment.apiBaseUrl }/api/v3/artists/join`,
      model
    );
  }
}
