import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LangService } from '@common/services/lang.service';
import { PageNameEnum } from '@common/enums/page-name.enum';
import { IsBrowserService } from '@common/services/is-browser.service';
import { NewsTypeI18nEnum } from '@common/enums/news-type-i18n.enum';
import { MatchMediaService } from '@common/services/match-media.service';
import { BehaviorSubject } from 'rxjs';
import { NewsModelInterface } from '@common/interfaces/news-model.interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsItemComponent {
  private readonly _isErrorImageSrc$ = new BehaviorSubject(false);
  @Output() readonly isClickLink = new EventEmitter<NewsModelInterface>();
  @Input() readonly news: NewsModelInterface;
  readonly lang$ = this._langService.lang$;
  readonly pageNameEnum = PageNameEnum;
  readonly isBrowser = this._isBrowserService.isBrowser;
  readonly isErrorImageSrc$ = this._isErrorImageSrc$.asObservable();
  readonly newsTypeI18nEnum = NewsTypeI18nEnum;

  constructor(private readonly _langService: LangService,
              private readonly _isBrowserService: IsBrowserService,
              readonly matchMediaService: MatchMediaService) {
  }

  clickNews(news: NewsModelInterface): void {
    this.isClickLink.emit(news);
  }

  onErrorImage(): void {
    this._isErrorImageSrc$.next(true);
  }
}
