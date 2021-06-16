import { Injectable } from '@angular/core';
import { MyCookiesService } from '@common/services/my-cookies.service';
import { SessionService } from '@common/services/session-service';
import { UserApiService } from '@common/services/api/user-api.service';
import { COOKIE_OPERATING_SYSTEM } from '@common/utils/cookie.utils';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { OperatingSystemService } from '@common/services/operating-system.service';
import { LangService } from '@common/services/lang.service';
import { IsBrowserService } from '@common/services/is-browser.service';
import { Router } from '@angular/router';

@UntilDestroy()
@Injectable()
export class AppInitService {
  currentOperatingSystem = this._operatingSystemService.get();
  readonly isBrowser = this._isBrowserService.isBrowser;

  constructor(private readonly _authApiService: UserApiService,
              private readonly _cookiesService: MyCookiesService,
              private readonly _sessionService: SessionService,
              private readonly _myCookiesService: MyCookiesService,
              private readonly _operatingSystemService: OperatingSystemService,
              private readonly _langService: LangService,
              private readonly _isBrowserService: IsBrowserService,
              private readonly _router: Router) {
  }

  initApp(): Promise<void> {
    return new Promise(resolve => {
      if (this._cookiesService.getToken()) {
        if (this.currentOperatingSystem !== this._cookiesService.get(COOKIE_OPERATING_SYSTEM)) {
          this._authApiService.update({ device_name: this.currentOperatingSystem })
            .pipe(untilDestroyed(this))
            .subscribe(() => {
              this.setCookieOperatingSystem();
            });
        }
        this._langService.setLangByUrl();
        resolve();
      } else {
        this._authApiService.authorization({
          ...this._sessionService.currentUser,
          device_name: this.currentOperatingSystem
        })
          .pipe(untilDestroyed(this))
          .subscribe(
            data => {
              this._myCookiesService.setToken(data.token);
              this.setCookieOperatingSystem();
              this._langService.setLangByUrl();
              resolve();
            },
            () => resolve()
          );
      }
    });
  }

  private setCookieOperatingSystem(): void {
    this._myCookiesService.put(COOKIE_OPERATING_SYSTEM, this.currentOperatingSystem);
  }
}
