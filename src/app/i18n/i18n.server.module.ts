import { Inject, NgModule } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { Request } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { LANG_DEFAULT, LANGS_ARR } from '@common/utils/langs.utils';
import { LangEnum } from '@common/enums/lang.enum';
import { LangService } from '@common/services/lang.service';

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateFSLoaderFactory
      }
    })
  ]
})
export class I18nServerModule {
  constructor(private readonly _langService: LangService,
              translateService: TranslateService,
              @Inject(REQUEST) req: Request) {

    translateService.addLangs(LANGS_ARR);
    let language: LangEnum | string = this._langService.getLangByUrl();
    if (!LANGS_ARR.includes(language as LangEnum)) {
      language = LANG_DEFAULT;
    }
    translateService.use(language);
  }
}

export class TranslateFSLoader implements TranslateLoader {
  constructor(private prefix = 'i18n', private suffix = '.json') {
  }

  public getTranslation(lang: string): Observable<any> {
    const path = join(__dirname, '../browser/assets/', this.prefix, `${ lang }${ this.suffix }`);
    const data = JSON.parse(readFileSync(path, 'utf8'));
    return of(data);
  }
}

export function translateFSLoaderFactory(): TranslateFSLoader {
  return new TranslateFSLoader();
}
