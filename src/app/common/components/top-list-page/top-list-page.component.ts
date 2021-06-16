import { Component, Input, OnInit } from '@angular/core';
import { ItemTopListInterface, ItemTopListModel } from '@common/interfaces/item-top-list.interface';
import { PageNameEnum } from '../../enums/page-name.enum';
import { BehaviorSubject } from 'rxjs';
import { ItemsTypeTopListEnum } from '@common/enums/items-type-top-list.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ModalName } from '@common/enums/modal-name';
import { PaintingModalComponent } from '@common/modals/painting-modal/painting-modal.component';
import { IsBrowserService } from '@common/services/is-browser.service';
import { ModalService } from '@common/services/modal/modal.service';
import { PaintingModalInterface } from '@common/interfaces/painting-modal.interface';
import { QueryParamsEnum } from '@common/enums/query-params.enum';
import { RoutesActiveService } from '@common/services/routes-active.service';
import { MetaTagsService } from '@common/services/meta-tags.service';
import { TranslateService } from '@ngx-translate/core';
import { SeoSocialShareData, SeoSocialShareService } from 'ngx-seo';

@UntilDestroy()
@Component({
  selector: 'app-top-list-page',
  templateUrl: './top-list-page.component.html',
  styleUrls: ['./top-list-page.component.scss']
})
export class TopListPageComponent implements OnInit {
  private readonly _upperBlock$ = new BehaviorSubject<ItemTopListModel[]>([]);
  private readonly _centralBlock$ = new BehaviorSubject<ItemTopListModel[]>([]);
  private readonly _lowerBlock$ = new BehaviorSubject<ItemTopListModel[]>([]);

  @Input() readonly topList: ItemTopListInterface[];
  readonly upperBlock$ = this._upperBlock$.asObservable();
  readonly centralBlock$ = this._centralBlock$.asObservable();
  readonly lowerBlock$ = this._lowerBlock$.asObservable();
  readonly currentPage$ = this._routesActiveService.currentPage$;

  readonly itemsTypeEnum = ItemsTypeTopListEnum;
  readonly pageNameI18n$ = this.currentPage$
    .pipe(map(currentPage => {
      switch (currentPage) {
        case PageNameEnum.TopArtists:
          return 'PAGES.TOP_ARTISTS_PAGE.';

        case PageNameEnum.TopPaintings:
          return 'PAGES.TOP_PAINTINGS_PAGE.';
      }
    }));

  constructor(private readonly _activatedRoute: ActivatedRoute,
              private readonly _router: Router,
              private readonly _isBrowserService: IsBrowserService,
              private readonly _modalService: ModalService,
              private readonly _routesActiveService: RoutesActiveService,
              private readonly _seoService: MetaTagsService,
              private readonly _translate: TranslateService,
              private readonly _seoSocialShareService: SeoSocialShareService,
              private readonly _metaTagsService: MetaTagsService) {
  }

  ngOnInit(): void {
    this.addMeta();

    this.topList.forEach((itemList, index) => {
      switch (true) {
        case index === 0:
          this._upperBlock$.next([{
            number: index + 1,
            item: itemList
          }]);
          break;

        case index >= 1 && index <= 3:
          this._centralBlock$.next([...this._centralBlock$.value, {
            number: index + 1,
            item: itemList
          }]);
          break;

        case index > 3:
          this._lowerBlock$.next([...this._lowerBlock$.value, {
            number: index + 1,
            item: itemList
          }]);
          break;
      }
    });

    this.currentPage$
      .pipe(untilDestroyed(this));

    if (this._isBrowserService.isBrowser) {
      this._activatedRoute.queryParams
        .pipe(
          withLatestFrom(this.currentPage$),
          filter(([, currentPage]) => currentPage === PageNameEnum.TopPaintings),
          map(([queryParams, currentPage]) => ({ paintingId: +queryParams[QueryParamsEnum.PaintingId], currentPage })),
          filter(({ paintingId, currentPage }) => {
            const openedPaintingModal = this._modalService.getOpenedModalByName(ModalName.Painting);
            return (paintingId && !openedPaintingModal) || (!paintingId && !!openedPaintingModal);
          }),
          untilDestroyed(this)
        )
        .subscribe(({ paintingId, currentPage }) => {
          const painting = this.topList.find(p => p.paintingId === paintingId);
          if (painting) {
            this.openPaintingModal(painting);
          } else {
            this._router.navigate([currentPage]);
            this._modalService.closeByName(ModalName.Painting);
          }
        });
    }
  }

  openPaintingModal(itemModel: ItemTopListInterface): void {
    const paintingModal: PaintingModalInterface = {
      id: itemModel.paintingId,
      artist: itemModel.artist,
      file: itemModel.file,
      watermark_file: itemModel.watermark_file,
      title_en: itemModel.title_en,
      title_ru: itemModel.title_ru,
      size: itemModel.size
    };

    this._modalService.open<PaintingModalInterface>(PaintingModalComponent, ModalName.Painting, {
      data: paintingModal
    });
  }

  private addMeta(): void {
    this.pageNameI18n$
      .pipe(untilDestroyed(this))
      .subscribe(pageNameI18n => {
        this._metaTagsService.addMetaTags({
          titleI18n: pageNameI18n + 'META_TITLE',
          descriptionI18n: pageNameI18n + 'META_DESCRIPTION',
          image: this.topList[0].webpack_file || this.topList[0].file,
          imageWithApiBaseUrl: true
        });
      });
  }
}
