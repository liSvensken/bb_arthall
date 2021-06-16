import { Injectable, NgZone } from '@angular/core';
import { IsBrowserService } from './is-browser.service';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { BreakpointsInterface } from '../interfaces/breakpoints.interface';

const BREAKPOINTS = {
  big: 1150,
  middle: 960,
  small: 760,
  xxs: 360
};

@Injectable({
  providedIn: 'root'
})
export class MatchMediaService {
  private readonly _currentMedia$ = new BehaviorSubject<BreakpointsInterface>(Object.keys(BREAKPOINTS).reduce((prev, curr) => {
    prev[curr] = false;
    return prev;
  }, {}) as BreakpointsInterface);

  private readonly _current$ = new BehaviorSubject(null);

  readonly currentMedia$ = this._currentMedia$.asObservable();

  get currentMedia(): BreakpointsInterface {
    return this._currentMedia$.value;
  }

  constructor(private readonly _isBrowserService: IsBrowserService,
              private readonly _ngZone: NgZone) {
    if (this._isBrowserService.isBrowser) {
      const currentVal = {} as BreakpointsInterface;
      const currentWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      Object.keys(BREAKPOINTS).forEach(key => {
        currentVal[key] = BREAKPOINTS[key] > currentWidth;
        window.matchMedia(`screen and (max-width: ${ BREAKPOINTS[key] - 1 }px)`).addListener(mql => {
          this._ngZone.run(() => {
            const upd: any = this._current$.value;
            upd[key] = mql.matches;
            this._current$.next(upd);
          });
        });
      });
      this._current$.next(currentVal);

      this._current$
        .pipe(debounceTime(0))
        .subscribe(data => this._currentMedia$.next(data));

      this._currentMedia$.next(currentVal);
    }
  }
}
