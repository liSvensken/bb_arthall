import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemTopListModel } from '@common/interfaces/item-top-list.interface';
import { LangService } from '@common/services/lang.service';
import { EnvironmentService } from '@common/services/environment.service';
import { ItemsTypeTopListEnum } from '@common/enums/items-type-top-list.enum';
import { Router } from '@angular/router';
import { ModalService } from '@common/services/modal/modal.service';
import { IsBrowserService } from '@common/services/is-browser.service';
import { PageNameEnum } from '@common/enums/page-name.enum';
import { RoutesActiveService } from '@common/services/routes-active.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, withLatestFrom } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-top-item',
  templateUrl: './top-item.component.html',
  styleUrls: ['./top-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopItemComponent implements OnInit {
  private readonly _onOpenPaintingModal$ = new Subject();
  private readonly _isErrorImageSrc$ = new BehaviorSubject(false);

  @Input() readonly itemModel: ItemTopListModel;
  @Input() readonly itemType: ItemsTypeTopListEnum;
  @Input() readonly itemNumber: number;
  @Output() readonly openPaintingModal = new EventEmitter();

  readonly currentPage$ = this._routesActiveService.currentPage$;
  readonly lang$ = this._langService.lang$;
  readonly apiBaseUrl = this._environmentService.environment.apiBaseUrl;
  readonly isErrorImageSrc$ = this._isErrorImageSrc$.asObservable();
  readonly itemsTypeEnum = ItemsTypeTopListEnum;
  readonly pageNameEnum = PageNameEnum;
  readonly isBrowser = this._isBrowserService.isBrowser;

  constructor(private readonly _langService: LangService,
              private readonly _environmentService: EnvironmentService,
              private readonly _router: Router,
              private readonly _modalService: ModalService,
              private readonly _isBrowserService: IsBrowserService,
              private readonly _routesActiveService: RoutesActiveService) {
  }

  ngOnInit(): void {
    this._onOpenPaintingModal$
      .pipe(
        withLatestFrom(this.currentPage$),
        filter(([, currentPage]) => currentPage === PageNameEnum.TopPaintings),
        untilDestroyed(this)
      )
      .subscribe(() => this.openPaintingModal.next(this.itemModel.item));
  }

  onOpenPaintingModal(): void {
    this._onOpenPaintingModal$.next();
  }

  onErrorImage(): void {
    this._isErrorImageSrc$.next(true);
  }
}
