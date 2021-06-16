import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { LangEnum } from '@common/enums/lang.enum';
import { LangService } from '@common/services/lang.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectComponent)
    }
  ]
})
export class SelectComponent {
  private readonly _isOpen$ = new BehaviorSubject<boolean>(false);

  readonly isOpen$ = this._isOpen$.asObservable();
  readonly lang$ = this._langService.lang$;
  readonly langEnum = LangEnum;

  constructor(readonly router: Router,
              private readonly _langService: LangService) {
  }

  toggleOpened(): void {
    this._isOpen$.next(!this._isOpen$.value);
  }

  close(): void {
    this._isOpen$.next(false);
  }
}
