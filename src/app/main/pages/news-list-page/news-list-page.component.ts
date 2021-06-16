import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewListResponseInterface } from '@common/interfaces/api/news/new-list-response.interface';
import { PageNameEnum } from '@common/enums/page-name.enum';
import { BehaviorSubject } from 'rxjs';
import { NewsTypeResponseEnum } from '@common/enums/news-type-response.enum';
import { LANGS_ARR } from '@common/utils/langs.utils';
import { LangService } from '@common/services/lang.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NewsApiService } from '@common/services/api/news-api.service';
import { finalize, skip, switchMap, tap } from 'rxjs/operators';
import { NewsTypeI18nEnum } from '@common/enums/news-type-i18n.enum';
import { EnvironmentService } from '@common/services/environment.service';
import { GlobalLoaderService } from '@common/services/global-loader.service';
import { MetaTagsService } from '@common/services/meta-tags.service';
import { TranslateService } from '@ngx-translate/core';
import { NewsModelInterface } from '@common/interfaces/news-model.interface';

@UntilDestroy()
@Component({
  selector: 'app-news-list-page',
  templateUrl: './news-list-page.component.html',
  styleUrls: ['./news-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListPageComponent implements OnInit {
  private readonly _newsList$ = new BehaviorSubject<NewsModelInterface[]>([]);
  private readonly _apiBaseUrl = this._environmentService.environment.apiBaseUrl;

  readonly newsList$ = this._newsList$.asObservable();
  readonly pageNameEnum = PageNameEnum;

  constructor(private readonly _activatedRoute: ActivatedRoute,
              private readonly _langService: LangService,
              private readonly _newsApiService: NewsApiService,
              private readonly _environmentService: EnvironmentService,
              private readonly _globalLoaderService: GlobalLoaderService,
              private readonly _seoService: MetaTagsService,
              private readonly _translate: TranslateService,
              private readonly _metaTagsService: MetaTagsService,
              private readonly _router: Router) {
  }

  ngOnInit(): void {
    const pageData: NewListResponseInterface[] = this._activatedRoute.snapshot.data.pageData;
    if (pageData) {
      this.transformNewsList(pageData);
    }

    this._langService.lang$
      .pipe(
        skip(1),
        tap(() => this._globalLoaderService.isActive$.next(true)),
        switchMap(lang => {
          return this._newsApiService.getNewsList(lang)
            .pipe(
              finalize(() => this._globalLoaderService.isActive$.next(false))
            );
        }),
        untilDestroyed(this)
      )
      .subscribe((newListResponse) => {
        this.transformNewsList(newListResponse);
      });

    this._metaTagsService.addMetaTags({
      titleI18n: 'PAGES.NEWS_LIST_PAGE.META_TITLE',
      descriptionI18n: 'PAGES.NEWS_LIST_PAGE.META_DESCRIPTION',
      image: this._newsList$.value[0].coverArt
    });
  }

  transformNewsList(newListResponse: NewListResponseInterface[]): void {
    const newsList: NewsModelInterface[] = [];
    newListResponse.forEach(newsResponse => {
      if (newsResponse.data.data.additional_type !== NewsTypeResponseEnum.Story) {
        const news: NewsModelInterface = {
          id: +newsResponse.data.data.id,
          date: newsResponse.created_at,
          typeNewsI18n:
            newsResponse.data.data.additional_type === NewsTypeResponseEnum.Article
              ? NewsTypeI18nEnum.ArticleI18n
              : NewsTypeI18nEnum.ArtistI18n,

          coverArt:
            newsResponse.data.data.additional_type === NewsTypeResponseEnum.Article
              ? newsResponse.data.data.title_image
              : this._apiBaseUrl + newsResponse.data.data.photo,
          title: {},
          preview: newsResponse.data.data.preview
        };

        LANGS_ARR.forEach(lang => {
          news.title[lang] = newsResponse.data[`body_${ lang }`];
        });

        if (newsResponse.data.data.additional_type === NewsTypeResponseEnum.Artist) {
          news.artist = {
            id: newsResponse.data.data.id,
            url: newsResponse.data.data.url
          };
          news.paintingsUrls = [
            this._apiBaseUrl + newsResponse.data.data.painting_0,
            this._apiBaseUrl + newsResponse.data.data.painting_1,
            this._apiBaseUrl + newsResponse.data.data.painting_2];
        }
        newsList.push(news);
      }
    });

    this._newsList$.next(newsList);
  }

  clickLink(news: NewsModelInterface): void {
    const type = news.typeNewsI18n;
    const newsId = news.id;
    const artist = news?.artist;
    switch (type) {
      case NewsTypeI18nEnum.ArticleI18n:
        this._router.navigate([PageNameEnum.News, newsId]);
        break;

      case NewsTypeI18nEnum.ArtistI18n:
        this._router.navigate([PageNameEnum.Artists, artist.url || artist.id]);
        break;
    }
  }
}
