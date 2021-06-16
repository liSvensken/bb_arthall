import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { EnvironmentService } from '@common/services/environment.service';
import { LangService } from '@common/services/lang.service';
import { IsBrowserService } from '@common/services/is-browser.service';
import { ModalService } from '@common/services/modal/modal.service';
import { PaintingInterface } from '@common/interfaces/api/paintings/painting.interface';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, withLatestFrom } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatchMediaService } from '@common/services/match-media.service';
import { PageNameEnum } from '@common/enums/page-name.enum';
import { ArtistResponse } from '@common/interfaces/api/artists/artist-response-full.interface';

interface Column {
  totalHeight: number;
  paintingList: PaintingInterface[];
}

@UntilDestroy()
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent implements OnInit {
  private readonly _resize$ = new Subject();
  private readonly _columnsArr$ = new BehaviorSubject<Column[]>([]);
  @Input() readonly artist: ArtistResponse;
  @Output() readonly openModal = new EventEmitter<PaintingInterface>();
  readonly apiBaseUrl = this._environmentService.environment.apiBaseUrl;

  columnFirst: Column = {
    totalHeight: 0,
    paintingList: []
  };
  columnSecond: Column = {
    totalHeight: 0,
    paintingList: []
  };
  columnThird: Column = {
    totalHeight: 0,
    paintingList: []
  };

  readonly columnsArr$ = this._columnsArr$.asObservable();

  readonly lang$ = this._langService.lang$;
  readonly isBrowser = this._isBrowserService.isBrowser;
  readonly columnsGap = 20;
  readonly pageNameEnum = PageNameEnum;

  constructor(private readonly _environmentService: EnvironmentService,
              private readonly _langService: LangService,
              private readonly _isBrowserService: IsBrowserService,
              private readonly _modalService: ModalService,
              private readonly _elementRef: ElementRef,
              private readonly _matchMediaService: MatchMediaService) {
  }

  @HostListener('window:resize') windowResize(): void {
    this.resize();
  }

  ngOnInit(): void {
    if (this._isBrowserService.isBrowser) {
      this._resize$
        .pipe(
          debounceTime(300),
          withLatestFrom(this._matchMediaService.currentMedia$),
          untilDestroyed(this)
        )
        .subscribe(([, currentMedia]) => {
          this.columnFirst = { totalHeight: 0, paintingList: [] };
          this.columnSecond = { totalHeight: 0, paintingList: [] };
          this.columnThird = { totalHeight: 0, paintingList: [] };

          const contentWidth = this._elementRef.nativeElement.getBoundingClientRect().width;
          let columnWidth: number;

          const paintingsList = this.artist.paintings;

          switch (true) {
            case currentMedia.small:
              columnWidth = contentWidth;
              paintingsList.forEach(painting => {
                this.addPaintingAColumn(this.columnFirst, painting, columnWidth);
              });

              this._columnsArr$.next([this.columnFirst]);
              break;

            case currentMedia.big:
              columnWidth = (contentWidth - this.columnsGap) / 2;
              paintingsList.forEach(painting => {
                if (this.columnFirst.totalHeight <= this.columnSecond.totalHeight) {
                  this.addPaintingAColumn(this.columnFirst, painting, columnWidth);
                } else {
                  this.addPaintingAColumn(this.columnSecond, painting, columnWidth);
                }
              });

              this._columnsArr$.next([this.columnFirst, this.columnSecond]);
              break;

            default:
              columnWidth = (contentWidth - this.columnsGap * 2) / 3;
              paintingsList.forEach(painting => {
                if (this.columnFirst.totalHeight <= this.columnSecond.totalHeight &&
                  this.columnFirst.totalHeight <= this.columnThird.totalHeight) {
                  this.addPaintingAColumn(this.columnFirst, painting, columnWidth);
                } else if (this.columnSecond.totalHeight <= this.columnThird.totalHeight) {
                  this.addPaintingAColumn(this.columnSecond, painting, columnWidth);
                } else {
                  this.addPaintingAColumn(this.columnThird, painting, columnWidth);
                }
              });

              this._columnsArr$.next([this.columnFirst, this.columnSecond, this.columnThird]);
          }
        });

      this.resize();
    }
  }

  resize(): void {
    this._resize$.next();
  }

  addPaintingAColumn(column: Column, painting: PaintingInterface, columnWidth: number): void {
    painting.size.height = painting.size.height * columnWidth / painting.size.width;
    painting.size.width = columnWidth;

    column.totalHeight += painting.size.height;
    column.paintingList.push(painting);
  }

  openPainting(painting: PaintingInterface): void {
    this.openModal.emit(painting);
  }
}

