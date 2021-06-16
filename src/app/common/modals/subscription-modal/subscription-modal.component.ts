import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { ModalBase } from '@common/abstractions/modal-base';
import { ModalService } from '@common/services/modal/modal.service';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { UserApiService } from '@common/services/api/user-api.service';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LS_PAINTINGS_LENGTH, COOKIE_TOKEN_FIREBASE, LS_UNSUBSCRIBE_FIREBASE } from '@common/utils/cookie.utils';
import { MyCookiesService } from '@common/services/my-cookies.service';
import { ModalName } from '@common/enums/modal-name';
import { LangService } from '@common/services/lang.service';
import { LangEnum } from '@common/enums/lang.enum';

@UntilDestroy()
@Component({
  selector: 'app-application-modal',
  templateUrl: './subscription-modal.component.html',
  styleUrls: ['./subscription-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionModalComponent extends ModalBase {
  private readonly _isClickSubscribe$ = new BehaviorSubject<boolean>(false);
  private readonly _successfulSubscription$ = new BehaviorSubject(false);
  private readonly _unsubscribeSubscription$ = new BehaviorSubject(false);

  readonly lang$ = this._langService.lang$;
  readonly langEnum = LangEnum;
  readonly isClickSubscribe$ = this._isClickSubscribe$.asObservable();
  readonly successfulSubscription$ = this._successfulSubscription$.asObservable();
  readonly unsubscribeSubscription$ = this._unsubscribeSubscription$.asObservable();

  constructor(modalService: ModalService,
              elementRef: ElementRef,
              private readonly _angularFireMessaging: AngularFireMessaging,
              private readonly _userApiService: UserApiService,
              private readonly _myCookiesService: MyCookiesService,
              private readonly _langService: LangService) {
    super(modalService, elementRef);
  }

  subscribe(): void {
    this._isClickSubscribe$.next(true);

    this._angularFireMessaging.requestToken
      .pipe(
        switchMap(token => {
          if (token) {
            // разрешить уведомления
            return this._userApiService.update({ fcm_token: token })
              .pipe(
                tap(() => {
                  this._myCookiesService.put(COOKIE_TOKEN_FIREBASE, token);
                  localStorage.removeItem(LS_PAINTINGS_LENGTH);
                  this._successfulSubscription$.next(true);
                }),
                untilDestroyed(this)
              );
          } else {
            // блокировать уведомления
            localStorage.removeItem(LS_PAINTINGS_LENGTH);
            console.log(LS_UNSUBSCRIBE_FIREBASE);
            localStorage.setItem(LS_UNSUBSCRIBE_FIREBASE, String(true));
            this._unsubscribeSubscription$.next(true);
            return of(null);
          }
        }),
        untilDestroyed(this)
      )
      .subscribe(
        () => {
        },
        (err) => {
          console.error('Не удалось получить разрешение на уведомление', err);
        }
      );
  }

  continue(): void {
    this._modalService.closeByName(ModalName.Subscription);
  }
}
