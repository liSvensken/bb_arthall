import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WindowInnerSizesService {
  private readonly _innerWidth$ = new BehaviorSubject(0);
  private readonly _innerHeight$ = new BehaviorSubject(0);

  readonly innerWidth$ = this._innerWidth$.asObservable();
  readonly innerHeight$ = this._innerHeight$.asObservable();

  set innerWidth(innerWidth: number) {
    this._innerWidth$.next(innerWidth);
  }

  set innerHeight(innerHeight: number) {
    this._innerHeight$.next(innerHeight);
  }
}
