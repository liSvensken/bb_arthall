import { Injectable } from '@angular/core';
import { CookieService } from '@gorniv/ngx-universal';
import { BehaviorSubject } from 'rxjs';
import { COOKIE_TOKEN_KEY } from '../utils/cookie.utils';

@Injectable({ providedIn: 'root' })
export class MyCookiesService {
  private readonly _token$ = new BehaviorSubject(null);

  readonly token$ = this._token$.asObservable();

  constructor(private cookies: CookieService) {
  }

  get(name: string): string {
    const value = this.cookies.get(name);

    return value === 'undefined' ? null : value;
  }

  put(name: string, val: any): void {
    this.cookies.put(name, val);
  }

  remove(name: string): void {
    this.cookies.remove(name);
  }

  setToken(token: string): void {
    this.put(COOKIE_TOKEN_KEY, token);
    this._token$.next(token);
  }

  getToken(): string {
    const token = this.get(COOKIE_TOKEN_KEY);
    if (token && token !== this._token$.value) {
      this._token$.next(token);
    }
    return token;
  }

  removeToken(): void {
    this.remove(COOKIE_TOKEN_KEY);
    this._token$.next(null);
  }
}
