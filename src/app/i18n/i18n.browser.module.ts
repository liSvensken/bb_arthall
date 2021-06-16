import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateCacheModule, TranslateCacheService, TranslateCacheSettings } from 'ngx-translate-cache';
import { LANG_DEFAULT, LANGS_ARR } from '@common/utils/langs.utils';
import { LangEnum } from '@common/enums/lang.enum';

@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [HttpClient]
      }
    }),
    TranslateCacheModule.forRoot({
      cacheService: {
        provide: TranslateCacheService,
        useFactory: translateCacheFactory,
        deps: [TranslateService, TranslateCacheSettings]
      }
    })
  ],
  exports: [TranslateModule]
})
export class I18nBrowserModule {
  constructor(translateService: TranslateService,
              translateCacheService: TranslateCacheService) {
    translateCacheService.init();
    translateService.addLangs(LANGS_ARR);
    let browserLang = translateCacheService.getCachedLanguage();
    if (!LANGS_ARR.includes(browserLang as LangEnum)) {
      browserLang = LANG_DEFAULT;
    }
    translateService.use(browserLang);
  }
}

export function translateLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient);
}

export function translateCacheFactory(translateService: TranslateService,
                                      translateCacheSettings: TranslateCacheSettings): TranslateCacheService {
  return new TranslateCacheService(translateService, translateCacheSettings);
}
