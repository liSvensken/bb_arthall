import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LangEnum } from '../enums/lang.enum';
import { UserAuthRequest } from '../interfaces/api/user/user-auth-request';

const USER_DEFAULT: UserAuthRequest = {
  lang: LangEnum.En,
};

@Injectable({ providedIn: 'root' })
export class SessionService {
  currentUser$ = new BehaviorSubject<UserAuthRequest>(USER_DEFAULT);

  get currentUser(): UserAuthRequest | null {
    return this.currentUser$.value;
  }
}
