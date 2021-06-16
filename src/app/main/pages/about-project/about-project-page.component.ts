import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LangService } from '@common/services/lang.service';
import { LangEnum } from '@common/enums/lang.enum';
import { TextBlocksI18n } from '@common/interfaces/text-blocks-i18n';
import { MetaTagsService } from '@common/services/meta-tags.service';

const TEXT_BLOCKS_I18N: TextBlocksI18n[] = [
  {
    value: 'PAGES.ABOUT_PROJECT_PAGE.CONTENT.BLOCK_1',
    lang: [LangEnum.En, LangEnum.Ru]
  },
  {
    value: 'PAGES.ABOUT_PROJECT_PAGE.CONTENT.BLOCK_2',
    lang: [LangEnum.En, LangEnum.Ru]
  },
  {
    value: 'PAGES.ABOUT_PROJECT_PAGE.CONTENT.BLOCK_3',
    lang: [LangEnum.En, LangEnum.Ru]
  },
  {
    value: 'PAGES.ABOUT_PROJECT_PAGE.CONTENT.BLOCK_4',
    lang: [LangEnum.En, LangEnum.Ru]
  },
  {
    value: 'PAGES.ABOUT_PROJECT_PAGE.CONTENT.BLOCK_5',
    lang: [LangEnum.En]
  },
  {
    value: 'PAGES.ABOUT_PROJECT_PAGE.CONTENT.BLOCK_6',
    lang: [LangEnum.En]
  }
];

@Component({
  selector: 'app-about-project-page',
  templateUrl: './about-project-page.component.html',
  styleUrls: ['./about-project-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutProjectPageComponent implements OnInit {
  readonly lang$ = this._langService.lang$;
  readonly langEnum = LangEnum;
  readonly textBlocksI18n = TEXT_BLOCKS_I18N;

  constructor(private readonly _langService: LangService,
              private readonly _metaTagsService: MetaTagsService) {
  }

  ngOnInit(): void {
    this._metaTagsService.addMetaTags({
        titleI18n: 'PAGES.ABOUT_PROJECT_PAGE.META_TITLE',
        descriptionI18n: 'PAGES.ABOUT_PROJECT_PAGE.META_DESCRIPTION'
      });
  }
}
