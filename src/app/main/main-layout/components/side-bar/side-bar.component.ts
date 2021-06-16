import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { LangService } from '@common/services/lang.service';
import { BehaviorSubject } from 'rxjs';
import { LangEnum } from '@common/enums/lang.enum';
import { SideBarService } from '@common/services/side-bar.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IsBrowserService } from '@common/services/is-browser.service';
import { checkExistParent } from '@common/utils/check-exist-parent.utils';
import { filter } from 'rxjs/operators';
import { MatchMediaService } from '@common/services/match-media.service';
import { OperatingSystemNamesEnum } from '@common/enums/operating-system-names.enum';
import { OperatingSystemService } from '@common/services/operating-system.service';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

@UntilDestroy()
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideBarComponent implements OnInit {
  private readonly _isOpenedMenu$ = new BehaviorSubject(true);
  @ViewChild('sideBarContainer', { static: false }) private readonly _sideBarContainer: ElementRef;
  @Output() readonly closeSideBar = new EventEmitter();

  @Input() readonly isOpenSideBarInput: boolean;
  readonly isOpenedMenu$ = this._isOpenedMenu$.asObservable();
  readonly lang$ = this._langService.lang$;
  readonly isBrowser = this._isBrowserService.isBrowser;
  readonly langEnum = LangEnum;

  readonly operatingSystem = this._operatingSystemService.get();
  readonly operatingSystemNamesEnum = OperatingSystemNamesEnum;

  constructor(private readonly _langService: LangService,
              private readonly _sideBarService: SideBarService,
              private readonly _isBrowserService: IsBrowserService,
              private readonly _matchMediaService: MatchMediaService,
              private readonly _operatingSystemService: OperatingSystemService,
              private readonly _elementRef: ElementRef) {
    this._sideBarService.isOpened$
      .pipe(
        filter(() => this._isBrowserService.isBrowser),
        untilDestroyed(this)
      )
      .subscribe(isActive => {
        if (isActive) {
          disableBodyScroll(this._elementRef.nativeElement);
        } else {
          enableBodyScroll(this._elementRef.nativeElement);
        }
      });
  }

  @HostListener('window:keydown.esc') windowKeydownEsc(): void {
    this._sideBarService.setOpened(false);
  }

  ngOnInit(): void {
    this._matchMediaService.currentMedia$
      .pipe(
        filter(currentMedia => currentMedia.middle),
        untilDestroyed(this)
      )
      .subscribe(() => this.setIsOpenedMenu(true));
  }

  onCloseSideBar(): void {
    this.closeSideBar.emit();
    this.setIsOpenedMenu(true);
  }

  toggleLangWindow(): void {
    this.setIsOpenedMenu(!this._isOpenedMenu$.value);
  }

  changeLang(langValue): void {
    this._langService.lang = langValue;
  }

  clickSideBarWrapper(event: MouseEvent): void {
    if (!checkExistParent(event.target, this._sideBarContainer.nativeElement)) {
      this.onCloseSideBar();
    }
  }

  private setIsOpenedMenu(isOpened: boolean): void {
    this._isOpenedMenu$.next(isOpened);
  }
}
