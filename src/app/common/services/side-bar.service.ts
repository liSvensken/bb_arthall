import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SideBarService {
  private readonly _isOpened$ = new BehaviorSubject(false);

  readonly isOpened$ = this._isOpened$.asObservable();

  constructor(private readonly _router: Router) {
    this._router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setOpened(false);
      });
  }

  setOpened(isOpened: boolean): void {
    if (isOpened !== this._isOpened$.value) {
      this._isOpened$.next(isOpened);
    }
  }
}
