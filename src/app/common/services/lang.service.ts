import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { LANGS_ARR } from '../utils/langs.utils';
import { LangEnum } from '../enums/lang.enum';
import { UserApiService } from '@common/services/api/user-api.service';
import { SessionService } from '@common/services/session-service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MyCookiesService } from '@common/services/my-cookies.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IsBrowserService } from '@common/services/is-browser.service';
import { filter } from 'rxjs/operators';

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class LangService {
  private readonly _lang$ = new BehaviorSubject<LangEnum>(null);
  readonly lang$ = this._lang$.asObservable();

  get lang(): LangEnum {
    return this._lang$.value;
  }

  set lang(lang: LangEnum) {
    if (lang !== this._lang$.value && LANGS_ARR.includes(lang)) {
      this._translateService.use(lang);
      this._lang$.next(lang);

      this._userApiService.update({ lang: this._lang$.value })
        .pipe(untilDestroyed(this))
        .subscribe(
          () => {
          },
          error => {
            console.error(error);
          });
    }
  }

  constructor(private readonly _translateService: TranslateService,
              private readonly _userApiService: UserApiService,
              private readonly _sessionService: SessionService,
              private readonly _myCookiesService: MyCookiesService,
              private readonly _router: Router,
              private readonly _isBrowserService: IsBrowserService,
              private readonly _activatedRoute: ActivatedRoute) {
    this._router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setLangByUrl();
      });
  }

  setLangByUrl(): void {
    this.lang = this.getLangByUrl();
  }

  getLangByUrl(): LangEnum {
    if (this._isBrowserService.isBrowser) {
      if (this._router.url.split('/')[1] === LangEnum.Ru) {
        return LangEnum.Ru;
      } else {
        return LangEnum.En;
      }
    }
  }
}
