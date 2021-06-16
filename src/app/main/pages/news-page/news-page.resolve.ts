import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { MyCookiesService } from '@common/services/my-cookies.service';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { NewsApiService } from '@common/services/api/news-api.service';
import { NewsResponseInterface } from '@common/interfaces/api/news/news-response.interface';

@Injectable()
export class NewsPageResolve implements Resolve<NewsResponseInterface> {
  private _newsId: number;

  constructor(private readonly _newsApiService: NewsApiService,
              private readonly _myCookiesService: MyCookiesService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<NewsResponseInterface> {
    this._newsId = +route.params.id;

    return this._myCookiesService.token$
      .pipe(
        filter(token => !!token),
        take(1),
        switchMap(() => this._newsApiService.getNews(this._newsId).pipe(take(1))),
        catchError(() => of(null))
      );
  }
}
