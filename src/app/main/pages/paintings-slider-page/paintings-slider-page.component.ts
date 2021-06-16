import { ChangeDetectionStrategy, Component, HostListener, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import Swiper from 'swiper';
import { PaintingsApiService } from '@common/services/api/paintings-api.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, filter, map, take, withLatestFrom } from 'rxjs/operators';
import { IsBrowserService } from '@common/services/is-browser.service';
import { MatchMediaService } from '@common/services/match-media.service';
import { indicateLoading } from '@common/utils/rxjs-indicate-operators.utils';
import { PaintingResponse } from '@common/interfaces/api/paintings/paintings-list-response.interface';
import { PaintingsRatingComponent } from './components/paintings-rating/paintings-rating.component';
import { EnvironmentService } from '@common/services/environment.service';
import { RatingEnum } from '@common/enums/rating.enum';
import { LangService } from '@common/services/lang.service';
import { PageNameEnum } from '@common/enums/page-name.enum';
import { ModalService } from '@common/services/modal/modal.service';
import { PaintingModalComponent } from '@common/modals/painting-modal/painting-modal.component';
import { SubscriptionModalComponent } from '@common/modals/subscription-modal/subscription-modal.component';
import { MyCookiesService } from '@common/services/my-cookies.service';
import { LS_PAINTINGS_LENGTH, COOKIE_TOKEN_FIREBASE, LS_UNSUBSCRIBE_FIREBASE } from '@common/utils/cookie.utils';
import { SLIDE_WIDTH_PERCENT_FULL, SLIDE_WIDTH_PERCENT_SMALL, SLIDES_FOR_OPEN_SUBSCRIBE } from './utils/consts';
import { GlobalLoaderService } from '@common/services/global-loader.service';
import {
  DESCRIPTION_HEIGHT_DESK,
  DESCRIPTION_HEIGHT_SMALL,
  FOOTER_HEIGHT_DESK,
  FOOTER_HEIGHT_MIDDLE,
  HEADER_HEIGHT_DESK,
  HEADER_HEIGHT_SMALL,
  PAGE_MARGIN_DESK,
  PAGE_MARGIN_SMALL,
  SLIDER_MARGIN_BOTTOM
} from '@common/utils/consts';
import { PaintingSliderService } from '@common/services/painting-slider.service';
import { getBrowser, isEmptyObject } from '@common/utils/common.utils';
import { BrowserNamesEnum } from '@common/enums/browser-names.enum';
import { ModalName } from '@common/enums/modal-name';
import { PaintingModalIn } from '@common/modals/painting-modal/painting-modal-interfaces';
import { QueryParamsEnum } from '@common/enums/query-params.enum';
import { MetaTagsService } from '@common/services/meta-tags.service';
import { ViewedPaintingService } from '@common/services/viewed-painting.service';

enum KeyboardKeys {
  Right = 'ArrowRight',
  Left = 'ArrowLeft'
}

@UntilDestroy()
@Component({
  selector: 'app-paintings-slider-page',
  templateUrl: './paintings-slider-page.component.html',
  styleUrls: ['./paintings-slider-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaintingsSliderPageComponent implements OnInit {
  @ViewChild(PaintingsRatingComponent, { static: false }) private readonly _descriptionRating: PaintingsRatingComponent;

  private readonly _paintingsList$ = new BehaviorSubject<PaintingResponse[]>([]);
  private readonly _currentPainting$ = new BehaviorSubject<PaintingResponse>(null);
  private readonly _isError$ = new BehaviorSubject<boolean>(false);
  private readonly _contentHeight$ = new BehaviorSubject<number>(null);
  private readonly _slideWidth$ = new BehaviorSubject<number>(null);
  private readonly _slideHeight$ = new BehaviorSubject<number>(null);
  private readonly _resize$ = new Subject();

  private _swiper: Swiper;

  readonly paintingsList$ = this._paintingsList$.asObservable();
  readonly currentPainting$ = this._currentPainting$.asObservable();
  readonly lang$ = this._langService.lang$;
  readonly pageNameEnum = PageNameEnum;
  readonly slideWidth$ = this._slideWidth$.asObservable();
  readonly slideHeight$ = this._slideHeight$.asObservable();

  readonly slidesPerView$ = this._matchMediaService.currentMedia$
    .pipe(map(media => media.small ? 1.2 : 2.2));

  readonly spaceBetween$ = this._matchMediaService.currentMedia$
    .pipe(map(media => media.small ? 16 : 100));

  readonly contentMargin$ = this._matchMediaService.currentMedia$
    .pipe(map(media => media.small ? PAGE_MARGIN_SMALL : PAGE_MARGIN_DESK));

  readonly sliderMarginBottom = SLIDER_MARGIN_BOTTOM;

  readonly descriptionHeight$ = this._matchMediaService.currentMedia$
    .pipe(map(media => media.small ? DESCRIPTION_HEIGHT_SMALL : DESCRIPTION_HEIGHT_DESK));

  readonly isBrowser = this._isBrowserService.isBrowser;
  readonly apiBaseUrl = this._environmentService.environment.apiBaseUrl;

  constructor(private readonly _activatedRoute: ActivatedRoute,
              private readonly _paintingsApi: PaintingsApiService,
              private readonly _isBrowserService: IsBrowserService,
              private readonly _matchMediaService: MatchMediaService,
              private readonly _ngZone: NgZone,
              private readonly _environmentService: EnvironmentService,
              private readonly _langService: LangService,
              private readonly _modalService: ModalService,
              private readonly _myCookiesService: MyCookiesService,
              private readonly _globalLoaderService: GlobalLoaderService,
              private readonly _router: Router,
              readonly paintingSliderService: PaintingSliderService,
              private readonly _metaTagsService: MetaTagsService,
              private readonly _viewedPaintingService: ViewedPaintingService) {
  }

  @HostListener(`window:keydown.${ KeyboardKeys.Right }`) keydownRight(): void {
    this.changeSlide(KeyboardKeys.Right);
  }

  @HostListener(`window:keydown.${ KeyboardKeys.Left }`) keydownLeft(): void {
    this.changeSlide(KeyboardKeys.Left);
  }

  @HostListener('window:resize') windowResize(): void {
    this.resize();
  }

  ngOnInit(): void {
    if (this._isBrowserService.isBrowser) {
      this._resize$
        .pipe(
          debounceTime(getBrowser() === BrowserNamesEnum.Safari ? 600 : 0),
          withLatestFrom(this._matchMediaService.currentMedia$),
          untilDestroyed(this)
        )
        .subscribe(([, currentMedia]) => {
          let nonSlideHeight: number;
          let nonContentHeight: number;
          let slideWidthPercent: number;
          switch (true) {
            case currentMedia.small:
              nonContentHeight = HEADER_HEIGHT_SMALL + PAGE_MARGIN_SMALL * 2 + FOOTER_HEIGHT_MIDDLE;
              nonSlideHeight = nonContentHeight + SLIDER_MARGIN_BOTTOM + DESCRIPTION_HEIGHT_SMALL;
              slideWidthPercent = innerWidth * SLIDE_WIDTH_PERCENT_SMALL;
              break;

            case currentMedia.middle:
              nonContentHeight = HEADER_HEIGHT_DESK + PAGE_MARGIN_DESK * 2 + FOOTER_HEIGHT_MIDDLE;
              nonSlideHeight = nonContentHeight + SLIDER_MARGIN_BOTTOM + DESCRIPTION_HEIGHT_DESK;
              slideWidthPercent = innerWidth * SLIDE_WIDTH_PERCENT_FULL;
              break;

            default:
              nonContentHeight = HEADER_HEIGHT_DESK + PAGE_MARGIN_DESK * 2 + FOOTER_HEIGHT_DESK;
              nonSlideHeight = nonContentHeight + SLIDER_MARGIN_BOTTOM + DESCRIPTION_HEIGHT_DESK;
              slideWidthPercent = innerWidth * SLIDE_WIDTH_PERCENT_FULL;
              break;
          }
          this._slideHeight$.next(innerHeight - nonSlideHeight);
          this._contentHeight$.next(innerHeight - nonContentHeight);
          this._slideWidth$.next(slideWidthPercent);
        });
    }

    this.resize();

    const pageData: PaintingResponse[] = this._activatedRoute.snapshot.data.pageData;
    if (pageData) {
      this._paintingsList$.next(pageData);
      this._currentPainting$.next(pageData[this.paintingSliderService.getCurrentSlideNumber()]);
      if (!this.paintingSliderService.getCurrentSlideNumber()) {
        this.setViewed(pageData[0].id);
      }
    } else {
      console.error('No pageData');
    }

    this._metaTagsService.addMetaTags({
      titleI18n: 'PAGES.SLIDER_PAGE.META_TITLE',
      descriptionI18n: 'PAGES.SLIDER_PAGE.META_DESCRIPTION',
      image: this._paintingsList$.value[0].webpack_file || this._paintingsList$.value[0].file,
      imageWithApiBaseUrl: true
    });

    // если есть queryParam={painting: xx}, то очищаем queryParam, потому что картинны может не оказаться в новом списке
    if (!isEmptyObject(this._activatedRoute.snapshot.queryParams)) {
      this._router.navigate(['/']);
    }

    if (this._isBrowserService.isBrowser) {
      this._activatedRoute.queryParams
        .pipe(
          map(queryParams => +queryParams[QueryParamsEnum.PaintingId]),
          filter(paintingId => {
            const openedPaintingModal = this._modalService.getOpenedModalByName(ModalName.Painting);
            return (paintingId && !openedPaintingModal) || (!paintingId && !!openedPaintingModal);
          }),
          untilDestroyed(this)
        )
        .subscribe(paintingId => {
          const painting = this._paintingsList$.value.find(p => p.id === paintingId);
          if (painting) {
            this._modalService.open<PaintingModalIn>(PaintingModalComponent, ModalName.Painting, {
              data: painting
            });
          } else {
            this._modalService.closeByName(ModalName.Painting);
          }
        });
    }
  }

  resize(): void {
    this._resize$.next();
  }

  // для инициализации слайдера
  initSwiper(swiper: Swiper): void {
    this._swiper = swiper;
  }

  // для переключения слайдера (посредством клика)
  slideTo(index: number): void {
    if (this._swiper.activeIndex === index) {
      this._modalService.open<PaintingModalIn>(PaintingModalComponent, ModalName.Painting, {
        data: this._paintingsList$.value[index]
      });
    } else {
      this._swiper.slideTo(index, 300);
    }
  }

  // смена слайда
  onSlideChange(): void {
    if (this._isBrowserService.isBrowser && this._swiper) {
      this._ngZone.run(() => {
        this._currentPainting$.next(this._paintingsList$.value[this._swiper.activeIndex]);
        this.paintingSliderService.setCurrentSlideNumber(this._swiper.activeIndex);
      });
    }
  }

  // инициализация слайда с реальным изменением индекса
  onRealIndexChange(): void {
    if (this._swiper && (this._swiper.activeIndex || this._swiper.activeIndex === 0)) {
      this.setViewed(this._paintingsList$.value[this._swiper.activeIndex].id);
    }
  }

  // достижение конечного слайда
  onReachEnd(): void {
    this._paintingsApi.getPaintingsList()
      .pipe(
        indicateLoading(this._globalLoaderService.isActive$),
        untilDestroyed(this)
      )
      .subscribe(data => {
          this._paintingsList$.next([...this._paintingsList$.value, ...data]);
        },
        error => {
          this._isError$.next(true);
          console.error(error);
        });
  }

  clickRating(rating: RatingEnum): void {
    this._currentPainting$.value.viewed = [{ rate: rating }];
    this._paintingsApi.changeRating(this._currentPainting$.value.id, rating)
      .pipe(take(1), untilDestroyed(this))
      .subscribe(
        () => {
        },
        err => console.error(err)
      );
  }

  // сменить слад слайд при нажатии клавиши
  private changeSlide(keyboardKeys: KeyboardKeys): void {
    switch (keyboardKeys) {
      case KeyboardKeys.Left:
        this._swiper.slidePrev(200, true);
        break;

      case KeyboardKeys.Right:
        this._swiper.slideNext(200, true);
        break;
    }
  }

  // отправить картину как просмотренную
  private setViewed(paintingId: number): void {
    if (this._isBrowserService.isBrowser) {
      if (!this._viewedPaintingService.paintingWasViewed(paintingId)) {
        this._paintingsApi.setViewed(paintingId)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this._viewedPaintingService.addPaintingsAsViewed(paintingId);
          });
      }

      // если в cookies нет fire-токена и не отписки от уведомлений ранее
      if (!this._myCookiesService.get(COOKIE_TOKEN_FIREBASE) &&
        !localStorage.getItem(LS_UNSUBSCRIBE_FIREBASE)) {
        const paintingsLength = +localStorage.getItem(LS_PAINTINGS_LENGTH) || 0;
        localStorage.setItem(LS_PAINTINGS_LENGTH, String(paintingsLength + 1));

        // если посматриваем 10, 30... за все время картину, то открываем модалку подписаться
        SLIDES_FOR_OPEN_SUBSCRIBE.forEach(slideNum => {
          if (paintingsLength === slideNum) {
            this._modalService.open(SubscriptionModalComponent, ModalName.Subscription);
          }
        });
      }
    }
  }
}
