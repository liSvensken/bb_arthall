import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '@common/services/environment.service';
import { Observable } from 'rxjs';
import { BusinessListResponseInterface } from '@common/interfaces/api/business/business-list-response.interface';

@Injectable({ providedIn: 'root' })
export class BusinessApiService {
  constructor(private readonly _httpClient: HttpClient,
              private readonly _environmentService: EnvironmentService) {
  }

  getBusinessList(): Observable<BusinessListResponseInterface> {
    return this._httpClient.get<BusinessListResponseInterface>(
      `${ this._environmentService.environment.apiBaseUrl }/api/v3/app/business-links`
    );
  }
}
