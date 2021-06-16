import { AfterViewInit, Directive, HostListener, Input } from '@angular/core';
import { ScrollPagesService } from '@common/services/scroll-pages.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs/operators';
import { IsBrowserService } from '@common/services/is-browser.service';

@UntilDestroy()
@Directive({
  selector: '[appScrollPage]'
})
export class ScrollPageDirective implements AfterViewInit {
  @Input() private readonly _saveScroll: boolean;

  private _url = this._router.url.split('?')[0];

  private _scrollX: number;
  private _scrollY: number;

  constructor(private readonly _scrollPagesService: ScrollPagesService,
              private readonly _router: Router,
              private readonly _isBrowserService: IsBrowserService) {
  }

  @HostListener('window:scroll') windowScroll(): void {
    if (this._isBrowserService.isBrowser && this._saveScroll) {
      this._scrollX = window.scrollX;
      this._scrollY = window.scrollY;
    }
  }

  ngAfterViewInit(): void {
    if (this._isBrowserService.isBrowser) {
      if (this._saveScroll) {
        this._router.events
          .pipe(
            filter(event => event instanceof NavigationStart || event instanceof NavigationEnd),
            untilDestroyed(this)
          )
          .subscribe((event: NavigationStart | NavigationEnd) => {
            if (event instanceof NavigationStart) {
              this._scrollPagesService.save(this._url, this._scrollX, this._scrollY);
            } else {
              this._url = event.url.split('?')[0];
              this.setScrollPage();
            }
          });
        setTimeout(() => this.setScrollPage());
      } else {
        setDefaultScrollPage();
      }
    }
  }

  private setScrollPage(): void {
    const scroll = this._scrollPagesService.get(this._url);
    if (scroll) {
      window.scrollTo({ left: scroll.scrollX, top: scroll.scrollY, behavior: 'auto' });
    } else {
      setDefaultScrollPage();
    }
  }
}

function setDefaultScrollPage(): void {
  window.scrollTo({ left: 0, top: 0, behavior: 'auto' });
}
