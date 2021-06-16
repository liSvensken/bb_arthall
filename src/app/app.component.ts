import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IsBrowserService } from '@common/services/is-browser.service';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { WindowInnerSizesService } from '@common/services/window-inner-sizes.service';
import { RoutesActiveService } from '@common/services/routes-active.service';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  constructor(private readonly _routesActiveService: RoutesActiveService,
              private readonly _isBrowserService: IsBrowserService,
              private readonly _elementRef: ElementRef,
              private readonly _windowInnerSizesService: WindowInnerSizesService) {
  }

  @HostListener('window:scroll') @HostListener('window:resize') eventsWindowScrollOrResize(): void {
    this.setWindowSizes();
  }

  ngOnInit(): void {
    this.setWindowSizes();

    // костыль для айфона5
    if (this._isBrowserService.isBrowser) {
      this._routesActiveService.dataRoutes$
        .pipe(untilDestroyed(this))
        .subscribe(dataRoutes => {
          if (dataRoutes.bodyOverflowHidden) {
            disableBodyScroll(this._elementRef.nativeElement);
          } else {
            enableBodyScroll(this._elementRef.nativeElement);
          }
        });
    }
  }

  private setWindowSizes(): void {
    if (this._isBrowserService.isBrowser) {
      this._windowInnerSizesService.innerWidth = innerWidth;
      this._windowInnerSizesService.innerHeight = innerHeight;
    }
  }
}
