import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { MyCookiesService } from '@common/services/my-cookies.service';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, filter, take, withLatestFrom } from 'rxjs/operators';
import { NewsApiService } from '@common/services/api/news-api.service';
import { NewListResponseInterface } from '@common/interfaces/api/news/new-list-response.interface';
import { LangService } from '@common/services/lang.service';

@Injectable()
export class NewsListPageResolve implements Resolve<NewListResponseInterface[]> {
  constructor(private readonly _newsApiService: NewsApiService,
              private readonly _myCookiesService: MyCookiesService,
              private readonly _langService: LangService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<NewListResponseInterface[]> {
    return this._myCookiesService.token$
      .pipe(
        filter(token => !!token),
        take(1),
        withLatestFrom(this._langService.lang$),
        concatMap(([, lang]) => this._newsApiService.getNewsList(lang).pipe(take(1))),
        catchError(() => of(null))
      );
  }
}
