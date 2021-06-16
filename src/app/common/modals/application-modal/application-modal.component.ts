import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ModalBase } from '@common/abstractions/modal-base';
import { ModalService } from '@common/services/modal/modal.service';
import { IsBrowserService } from '@common/services/is-browser.service';
import { OperatingSystemService } from '@common/services/operating-system.service';
import { OperatingSystemNamesEnum } from '@common/enums/operating-system-names.enum';
import { LangEnum } from '@common/enums/lang.enum';
import { LangService } from '@common/services/lang.service';
import { WindowInnerSizesService } from '@common/services/window-inner-sizes.service';
import { BehaviorSubject } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-application-modal',
  templateUrl: './application-modal.component.html',
  styleUrls: ['./application-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationModalComponent extends ModalBase implements OnInit, OnDestroy {
  private readonly _isOpenModal$ = new BehaviorSubject(false);

  readonly isBrowser = this._isBrowserService.isBrowser;
  readonly operatingSystem = this._operatingSystemService.get();
  readonly operatingSystemNamesEnum = OperatingSystemNamesEnum;
  readonly lang$ = this._langService.lang$;
  readonly langEnum = LangEnum;
  readonly isOpenModal$ = this._isOpenModal$.asObservable();

  constructor(modalService: ModalService,
              elementRef: ElementRef,
              private readonly _isBrowserService: IsBrowserService,
              private readonly _operatingSystemService: OperatingSystemService,
              private readonly _langService: LangService,
              readonly windowInnerSizesService: WindowInnerSizesService) {
    super(modalService, elementRef);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this._isOpenModal$.next(true);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this._isOpenModal$.next(false);
  }
}
