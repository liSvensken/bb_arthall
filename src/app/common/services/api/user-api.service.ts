import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthRequest } from '../../interfaces/api/user/user-auth-request';
import { UserAuthResponse } from '../../interfaces/api/user/user-auth-response';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../environment.service';
import { UserUpdateResponse } from '@common/interfaces/api/user/user-update-response';
import { UserUpdateRequest } from '@common/interfaces/api/user/user-update-request';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  constructor(private readonly _httpClient: HttpClient,
              private readonly _environmentService: EnvironmentService) {
  }

  authorization(model: UserAuthRequest): Observable<UserAuthResponse> {
    return this._httpClient.post<UserAuthResponse>(
      `${ this._environmentService.environment.apiBaseUrl }/api/v3/user`,
      model
    );
  }

  update(model: UserUpdateRequest): Observable<UserUpdateResponse> {
    return this._httpClient.patch<UserUpdateResponse>(
      `${ this._environmentService.environment.apiBaseUrl }/api/v3/user`,
      model
    );
  }
}
