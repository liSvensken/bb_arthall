import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SeoSocialShareData, SeoSocialShareService } from 'ngx-seo';
import { EnvironmentService } from '@common/services/environment.service';

interface AddMetaTagsOptions {
  titleI18n: string;
  prefixTitle?: string;
  postfixTitle?: string;
  descriptionI18n: string;
  prefixDescription?: string;
  postfixDescription?: string;
  image?: string;
  imageWithAppHostUrl?: boolean;
  imageWithApiBaseUrl?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MetaTagsService {
  readonly appHostUrl = this._environmentService.environment.appHostUrl;
  readonly apiBaseUrl = this._environmentService.environment.apiBaseUrl;

  constructor(private readonly _translate: TranslateService,
              private readonly _seoSocialShareService: SeoSocialShareService,
              private readonly _router: Router,
              private readonly _environmentService: EnvironmentService) {
  }

  addMetaTags(opts: AddMetaTagsOptions): void {
    this._translate.stream([opts.titleI18n, opts.descriptionI18n])
      .subscribe(translate => {
        let title = translate[opts.titleI18n];
        let description = translate[opts.descriptionI18n];
        if (opts.prefixTitle) {
          title = opts.prefixTitle + title;
        }
        if (opts.postfixTitle) {
          title = title + opts.postfixTitle;
        }
        if (opts.prefixDescription) {
          description = opts.prefixDescription + description;
        }
        if (opts.postfixDescription) {
          description = description + opts.postfixDescription;
        }

        const seoData: SeoSocialShareData = {
          title,
          description,
          type: 'website',
          url: this.appHostUrl + this._router.url
        };

        switch (true) {
          case !opts.image:
            seoData.image = `${ this.appHostUrl }/assets/icons/common/logo/logo-black.svg`;
            break;

          case opts.imageWithAppHostUrl:
            seoData.image = `${ this.appHostUrl }${ opts.image }`;
            break;

          case opts.imageWithApiBaseUrl:
            seoData.image = `${ this.apiBaseUrl }${ opts.image }`;
            break;

          default:
            seoData.image = opts.image;
        }

        this._seoSocialShareService.setData(seoData);
      });
  }
}
