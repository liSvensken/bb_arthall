import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LangService } from '@common/services/lang.service';
import { PageNameEnum } from '@common/enums/page-name.enum';
import { LangEnum } from '@common/enums/lang.enum';
import { ModalService } from '@common/services/modal/modal.service';
import { ApplicationModalComponent } from '@common/modals/application-modal/application-modal.component';
import { ArtistResponse } from '@common/interfaces/api/artists/artist-response-full.interface';
import { ArtistsApiService } from '@common/services/api/artists-api.service';
import { GalleryComponent } from './components/gallery/gallery.component';
import { PaintingModalInterface } from '@common/interfaces/painting-modal.interface';
import { PaintingModalComponent } from '@common/modals/painting-modal/painting-modal.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ModalName } from '@common/enums/modal-name';
import { PaintingInterface } from '@common/interfaces/api/paintings/painting.interface';
import { IsBrowserService } from '@common/services/is-browser.service';
import { filter, map } from 'rxjs/operators';
import { PaintingModalIn } from '@common/modals/painting-modal/painting-modal-interfaces';
import { QueryParamsEnum } from '@common/enums/query-params.enum';
import { MetaTagsService } from '@common/services/meta-tags.service';

export enum SectionsEnum {
  Gallery = 'GALLERY',
  Manifest = 'MANIFEST',
}

@UntilDestroy()
@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistPageComponent implements OnInit {
  @ViewChild(GalleryComponent, { static: false }) private readonly _galleryComponent: GalleryComponent;
  private readonly _artist$ = new BehaviorSubject<ArtistResponse>(null);
  private readonly _pageSection$ = new BehaviorSubject<SectionsEnum>(SectionsEnum.Gallery);

  readonly artist$ = this._artist$.asObservable();
  readonly pageSection$ = this._pageSection$.asObservable();
  readonly pageSectionsEnum = SectionsEnum;

  readonly lang$ = this._langService.lang$;
  readonly pageNameEnum = PageNameEnum;
  readonly langEnum = LangEnum;

  constructor(private readonly _artistApiService: ArtistsApiService,
              private readonly _activatedRoute: ActivatedRoute,
              private readonly _langService: LangService,
              private readonly _modalService: ModalService,
              private readonly _router: Router,
              private readonly _isBrowserService: IsBrowserService,
              private readonly _metaTagsService: MetaTagsService) {
  }

  ngOnInit(): void {
    const pageData: ArtistResponse = this._activatedRoute.snapshot.data.pageData;
    if (pageData) {
      this._artist$.next(pageData);
      this.addMeta();
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
          const painting = this._artist$.value.paintings.find(p => p.id === paintingId);
          if (painting) {
            this.openedModal(painting);
          } else {
            this._modalService.closeByName(ModalName.Painting);
          }
        });
    }
  }

  openedModal(painting: PaintingInterface): void {
    const paintingModal: PaintingModalInterface = {
      id: painting.id,
      artist: this._artist$.value,
      file: painting.file,
      watermark_file: painting.watermark_file,
      title_en: painting.title_en,
      title_ru: painting.title_ru,
      size: painting.size
    };

    this._modalService.open<PaintingModalIn, PaintingModalComponent>(PaintingModalComponent, ModalName.Painting, {
      data: paintingModal
    });
  }

  togglePage(pageSection: SectionsEnum): void {
    this._pageSection$.next(pageSection);
  }

  openApplicationModal(): void {
    this._modalService.open(ApplicationModalComponent, ModalName.Application);
  }

  private addMeta(): void {
    const currentLang = this._artist$.value[`name_${ this._langService.lang }`];
    this._metaTagsService.addMetaTags({
      titleI18n: 'PAGES.ARTIST_PAGE.META_TITLE',
      prefixTitle: currentLang,
      descriptionI18n: 'PAGES.ARTIST_PAGE.META_DESCRIPTION',
      prefixDescription: currentLang,
      image: this._artist$.value.paintings[0].webpack_file,
      imageWithAppHostUrl: true
    });
  }
}
