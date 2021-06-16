import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IsBrowserService } from '@common/services/is-browser.service';
import { BehaviorSubject } from 'rxjs';
import { LANGS_ARR } from '@common/utils/langs.utils';
import { LangEnum } from '@common/enums/lang.enum';

const SKIP_PARAMS = [];

@Injectable({ providedIn: 'root' })
export class SessionUrlsService {
  private readonly _sessionUrlsArr$ = new BehaviorSubject<string[]>([]);
  readonly sessionUrlsArr$ = this._sessionUrlsArr$.asObservable();

  constructor(private readonly _router: Router,
              private readonly _isBrowserService: IsBrowserService,
              private readonly _activatedRoute: ActivatedRoute) {
    if (this._isBrowserService.isBrowser) {
      this._router.events
        .pipe(
          filter(event => event instanceof NavigationEnd),
          map(event => ({ event, route: this._activatedRoute })),
          map(({ event, route }) => {
            while (route.firstChild) {
              route = route.firstChild;
            }
            return { event, route };
          }),
          filter(({ event, route }) => route.outlet === 'primary'),
          filter(({ event, route }) => {
            event = event as NavigationEnd;
            const prevUrlSkipLang = this._sessionUrlsArr$.value[this._sessionUrlsArr$.value.length - 1];
            const currentUrl = event.url;
            let similarUrls = false;
            LANGS_ARR.forEach(langItem => {
              if (`/${ langItem }` + prevUrlSkipLang === currentUrl || prevUrlSkipLang === `/${ langItem }` + currentUrl) {
                similarUrls = true;
              }
            });
            return !SKIP_PARAMS.find(param => !!route.snapshot.params[param])
              && !currentUrl.includes('?')
              && currentUrl !== '/'
              && currentUrl !== `/${ LangEnum.Ru }`
              && !similarUrls;
          }),
        )
        .subscribe(({ event }) => {
          event = event as NavigationEnd;
          const currentUrl = event.url;
          const urlPartsLength = currentUrl.split('/').filter(item => !!item).length;

          if (urlPartsLength && urlPartsLength <= 1) {
            this._sessionUrlsArr$.next([]);
          }

          this._sessionUrlsArr$.next([...this._sessionUrlsArr$.value, currentUrl]);
        });
    }
  }

  goToPrevPage(): void {
    const sessionUrlsArr = this._sessionUrlsArr$.value;
    sessionUrlsArr.pop();
    this._sessionUrlsArr$.next(sessionUrlsArr);
    const prevUrl = sessionUrlsArr.pop();
    if (prevUrl) {
      this._router.navigateByUrl(prevUrl);
    } else {
      this._router.navigateByUrl('/');
    }
  }
}
