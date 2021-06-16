import { Injectable } from '@angular/core';
import { IsBrowserService } from '@common/services/is-browser.service';
import { OperatingSystemNamesEnum } from '@common/enums/operating-system-names.enum';

@Injectable({
  providedIn: 'root'
})
export class OperatingSystemService {
  constructor(private readonly _isBrowserService: IsBrowserService) {
  }

  get(): OperatingSystemNamesEnum {
    if (this._isBrowserService.isBrowser) {
      const userAgent = navigator.userAgent;
      const platform = navigator.platform;

      const iosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K', 'iPhone', 'iPad', 'iPod'];
      const browserPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];

      switch (true) {
        case iosPlatforms.indexOf(platform) !== -1:
          return OperatingSystemNamesEnum.Ios;

        case /Android/.test(userAgent):
          return OperatingSystemNamesEnum.Android;

        case browserPlatforms.indexOf(platform) !== -1 || (/Linux/.test(platform)):
          return OperatingSystemNamesEnum.Browser;
      }
    } else {
      return OperatingSystemNamesEnum.Browser;
    }
  }
}
