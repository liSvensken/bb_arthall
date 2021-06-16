import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsResponseInterface } from '@common/interfaces/api/news/news-response.interface';
import { PageNameEnum } from '@common/enums/page-name.enum';
import { BehaviorSubject } from 'rxjs';
import { LangService } from '@common/services/lang.service';
import { MatchMediaService } from '@common/services/match-media.service';
import { MetaTagsService } from '@common/services/meta-tags.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsPageComponent implements OnInit {
  private readonly _news$ = new BehaviorSubject<NewsResponseInterface>(null);

  readonly news$ = this._news$.asObservable();
  readonly lang$ = this._langService.lang$;
  readonly pageNameEnum = PageNameEnum;

  constructor(private readonly _activatedRoute: ActivatedRoute,
              private readonly _langService: LangService,
              readonly matchMediaService: MatchMediaService,
              private readonly _seoService: MetaTagsService,
              private readonly _translate: TranslateService) {
  }

  ngOnInit(): void {
    const pageData: NewsResponseInterface = this._activatedRoute.snapshot.data.pageData;
    if (pageData) {
      this._news$.next(pageData);
    }
  }
}
