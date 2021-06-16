import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '@common/services/environment.service';
import { Observable } from 'rxjs';
import { NewListResponseInterface } from '@common/interfaces/api/news/new-list-response.interface';
import { NewsResponseInterface } from '@common/interfaces/api/news/news-response.interface';
import { LangEnum } from '@common/enums/lang.enum';

@Injectable({ providedIn: 'root' })
export class NewsApiService {
  constructor(private readonly _httpClient: HttpClient,
              private readonly _environmentService: EnvironmentService) {
  }

  getNewsList(lang: LangEnum): Observable<NewListResponseInterface[]> {
    return this._httpClient.get<NewListResponseInterface[]>(
      `${ this._environmentService.environment.apiBaseUrl }/api/v3/app/web-notifications/${ lang }`
    );
  }

  getNews(id: number): Observable<NewsResponseInterface> {
    return this._httpClient.get<NewsResponseInterface>(
      `${ this._environmentService.environment.apiBaseUrl }/api/v3/articles/${ id }`
    );
  }
}
