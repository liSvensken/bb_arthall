import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SideBarService } from '@common/services/side-bar.service.ts';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HEADER_HEIGHT_DESK, HEADER_HEIGHT_SMALL } from '@common/utils/consts';
import { MatchMediaService } from '@common/services/match-media.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { IsBrowserService } from '@common/services/is-browser.service';
import { SessionUrlsService } from '@common/services/session-urls.service';
import { RoutesActiveService } from '@common/services/routes-active.service';

@UntilDestroy()
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent implements OnInit {
  @ViewChild(HeaderComponent, { static: true }) private readonly _headerComponent: HeaderComponent;
  @ViewChild('mainLayoutWrapper', { static: true }) private readonly _mainLayoutWrapper: ElementRef;

  readonly paddingTop$ = this._matchMediaService.currentMedia$
    .pipe(map(media => media.small ? HEADER_HEIGHT_SMALL : HEADER_HEIGHT_DESK));

  // readonly isMainPage$ = this._routesActiveService.currentPage$
  //   .pipe(map(currentPage => currentPage === PageNameEnum.Main));
  readonly isMainPage$ = this._sessionUrlsService.sessionUrlsArr$
    .pipe(map(sessionUrlsArr => !sessionUrlsArr.length));

  constructor(readonly sideBarService: SideBarService,
              private readonly _routesActiveService: RoutesActiveService,
              private readonly _router: Router,
              private readonly _renderer: Renderer2,
              private readonly _matchMediaService: MatchMediaService,
              private readonly _isBrowserService: IsBrowserService,
              private readonly _activatedRoute: ActivatedRoute,
              private readonly _sessionUrlsService: SessionUrlsService) {
  }

  @HostListener('window:resize') windowResize(): void {
    this.updateHeight();
  }

  ngOnInit(): void {
    if (this._isBrowserService.isBrowser) {
      this.updateHeight();
    }
  }

  toggleSideBar(isOpen: boolean): void {
    this.sideBarService.setOpened(isOpen);
  }

  // костыль для айфона 5
  updateHeight(): void {
    const height = `${ innerHeight }px`;
    this._renderer.setStyle(this._mainLayoutWrapper.nativeElement, 'height', height);

    // fixme если будет мешатся height, расскоментить или придумать условие, покоторому переключать на min-height
    // if (this._isBrowserService.isBrowser) {
    //   setTimeout(() => {
    //     this._renderer.setStyle(this._mainLayoutWrapper.nativeElement, 'min-height', height);
    //     this._renderer.setStyle(this._mainLayoutWrapper.nativeElement, 'height', 'auto');
    //   }, 1000);
    // }
  }

  goToPrevPage(): void {
    this._sessionUrlsService.goToPrevPage();
  }
}
