import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResolveEnd, ResolveStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GlobalLoaderService {
  readonly isActive$ = new BehaviorSubject(false);

  constructor(private _router: Router) {
    this._router.events
      .pipe(
        filter(e => e instanceof ResolveStart || e instanceof ResolveEnd)
      )
      .subscribe(e => {
        if (e instanceof ResolveStart) {
          this.setActive(true);
        } else {
          this.setActive(false);
        }
      });
  }

  setActive(status: boolean): void {
    this.isActive$.next(status);
  }
}
