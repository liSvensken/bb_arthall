import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ModalBase } from '@common/abstractions/modal-base';
import { ModalService } from '@common/services/modal/modal.service';
import { EnvironmentService } from '@common/services/environment.service';
import { LangService } from '@common/services/lang.service';
import { IsBrowserService } from '@common/services/is-browser.service';
import { FullScreenComponent } from '@common/modals/painting-modal/components/full-screen/full-screen.component';
import { relativeSideIsHeight } from '@common/utils/image-size.utils';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchMediaService } from '@common/services/match-media.service';
import { QueryParamsEnum } from '@common/enums/query-params.enum';
import { WindowInnerSizesService } from '@common/services/window-inner-sizes.service';
import { PaintingModalIn } from '@common/modals/painting-modal/painting-modal-interfaces';

@UntilDestroy()
@Component({
  selector: 'app-painting-modal',
  templateUrl: './painting-modal.component.html',
  styleUrls: ['./painting-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaintingModalComponent extends ModalBase<PaintingModalIn> implements OnInit, OnDestroy {
  @ViewChild(FullScreenComponent, { static: true }) private readonly _fullScreenComponent: FullScreenComponent;
  @ViewChild('imgElem', { static: true }) private readonly _imgElem: ElementRef;
  private readonly _isOpenFullScreen$ = new BehaviorSubject<boolean>(false);
  private readonly _paddingLeftRight$ = new BehaviorSubject<number>(110);
  private readonly _paddingTopBottom$ = new BehaviorSubject<number>(40);

  protected _skipChangeUrl = 1;

  readonly isOpenFullScreen$ = this._isOpenFullScreen$.asObservable();
  readonly apiBaseUrl = this._environmentService.environment.apiBaseUrl;
  readonly lang$ = this._langService.lang$;
  readonly isBrowser = this._isBrowserService.isBrowser;
  readonly paddingTopBottom$ = this._paddingLeftRight$.asObservable();
  readonly paddingLeftRight$ = this._paddingTopBottom$.asObservable();
  readonly innerWidth$ = this._windowInnerSizesService.innerWidth$;
  readonly innerHeight$ = this._windowInnerSizesService.innerHeight$;

  constructor(modalService: ModalService,
              elementRef: ElementRef,
              private readonly _environmentService: EnvironmentService,
              private readonly _langService: LangService,
              private readonly _isBrowserService: IsBrowserService,
              private readonly _renderer: Renderer2,
              private readonly _router: Router,
              private readonly _activatedRoute: ActivatedRoute,
              private readonly _ngZone: NgZone,
              private readonly _matchMediaService: MatchMediaService,
              private readonly _windowInnerSizesService: WindowInnerSizesService) {
    super(modalService, elementRef);
  }

  @HostListener('window:resize') windowResize(): void {
    this.defineMaxSize();
  }

  @HostListener('fullscreenchange', ['$event']) fullscreenchange(): void {
    this._ngZone.run(() => this._isOpenFullScreen$.next(!!document.fullscreenElement));
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.defineMaxSize();

    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: { [QueryParamsEnum.PaintingId]: this.data.id }, queryParamsHandling: 'merge'
    });

    this._matchMediaService.currentMedia$
      .pipe(untilDestroyed(this))
      .subscribe(media => {
        if (media.small && !media.xxs) {
          this._paddingLeftRight$.next(20);
          this._paddingTopBottom$.next(10);
        } else if (media.xxs) {
          this._paddingLeftRight$.next(6);
          this._paddingTopBottom$.next(6);
        }
      });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: { [QueryParamsEnum.PaintingId]: null }, queryParamsHandling: 'merge'
    });
  }

  openFullScreen(): void {
    this._fullScreenComponent.resetSize();

    const rfs = this._fullScreenComponent.fullScreenWrapper.nativeElement.requestFullscreen
      || this._fullScreenComponent.fullScreenWrapper.nativeElement.webkitRequestFullscreen
      || this._fullScreenComponent.fullScreenWrapper.nativeElement.mozRequestFullscreen
      || this._fullScreenComponent.fullScreenWrapper.nativeElement.msRequestFullscreen;

    rfs.call(this._fullScreenComponent.fullScreenWrapper.nativeElement);

    // if (getBrowser() !== BrowserNamesEnum.Safari) {
    //   this._fullScreenComponent.fullScreenWrapper.nativeElement.requestFullscreen();
    // } else {
    //   this._fullScreenComponent.fullScreenWrapper.nativeElement.webkitRequestFullscreen(); // exitFullscreen()
    //   this._isOpenFullScreen$.next(true);
    // }
  }

  private defineMaxSize(): void {
    const relativeIsHeight = relativeSideIsHeight(
      innerHeight - this._paddingTopBottom$.value,
      innerWidth - this._paddingLeftRight$.value,
      this.data.size.height,
      this.data.size.width
    );

    if (relativeIsHeight) {
      this._renderer.addClass(this._imgElem.nativeElement, 'mod-add-height');
    } else {
      this._renderer.removeClass(this._imgElem.nativeElement, 'mod-add-height');
    }
  }
}
