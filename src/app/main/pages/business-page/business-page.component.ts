import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IsBrowserService } from '@common/services/is-browser.service';
import { LangService } from '@common/services/lang.service';
import { ActivatedRoute } from '@angular/router';
import { BusinessApiService } from '@common/services/api/business-api.service';
import { BusinessListResponseInterface } from '@common/interfaces/api/business/business-list-response.interface';
import { LangEnum } from '@common/enums/lang.enum';
import { MetaTagsService } from '@common/services/meta-tags.service';
import { TranslateService } from '@ngx-translate/core';

interface TextBlocksI18n {
  value: string;
  lang: LangEnum[];
}

const TEXT_BLOCKS_I18N: TextBlocksI18n[] = [
  {
    value: 'PAGES.BUSINESS_PAGE.CONTENT.BLOCK_1',
    lang: [LangEnum.En, LangEnum.Ru]
  },
  {
    value: 'PAGES.BUSINESS_PAGE.CONTENT.BLOCK_2',
    lang: [LangEnum.En, LangEnum.Ru]
  },
  {
    value: 'PAGES.BUSINESS_PAGE.CONTENT.BLOCK_3',
    lang: [LangEnum.En, LangEnum.Ru]
  },
  {
    value: 'PAGES.BUSINESS_PAGE.CONTENT.BLOCK_4',
    lang: [LangEnum.En, LangEnum.Ru]
  },
  {
    value: 'PAGES.BUSINESS_PAGE.CONTENT.BLOCK_5',
    lang: [LangEnum.En]
  },
  {
    value: 'PAGES.BUSINESS_PAGE.CONTENT.BLOCK_6',
    lang: [LangEnum.En]
  },
  {
    value: 'PAGES.BUSINESS_PAGE.CONTENT.BLOCK_7',
    lang: [LangEnum.En]
  },
  {
    value: 'PAGES.BUSINESS_PAGE.CONTENT.BLOCK_8',
    lang: [LangEnum.En]
  },
];

@Component({
  selector: 'app-business-page',
  templateUrl: './business-page.component.html',
  styleUrls: ['./business-page.component.scss']
})
export class BusinessPageComponent implements OnInit {
  private readonly _videos$ = new BehaviorSubject<BusinessListResponseInterface>(null);

  readonly videos$ = this._videos$.asObservable();
  readonly isBrowser = this._isBrowserService.isBrowser;
  readonly lang$ = this._langService.lang$;
  readonly textBlocksI18n = TEXT_BLOCKS_I18N;

  constructor(private readonly _isBrowserService: IsBrowserService,
              private readonly _langService: LangService,
              private readonly _activatedRoute: ActivatedRoute,
              private readonly _businessApiService: BusinessApiService,
              private readonly _seoService: MetaTagsService,
              private readonly _translate: TranslateService,
              private readonly _metaTagsService: MetaTagsService) {
  }

  ngOnInit(): void {
    this._metaTagsService.addMetaTags({
      titleI18n: 'PAGES.BUSINESS_PAGE.META_TITLE',
      descriptionI18n: 'PAGES.BUSINESS_PAGE.META_DESCRIPTION'
    });

    const pageData: BusinessListResponseInterface = this._activatedRoute.snapshot.data.pageData;
    if (pageData) {
      this._videos$.next(pageData);
    }
  }

  onErrorImage(index: number): void {
    this._videos$.value[this._langService.lang][index].logo = null;
  }
}
