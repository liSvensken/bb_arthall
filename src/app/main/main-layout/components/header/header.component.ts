import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LangService } from '@common/services/lang.service';
import { MatchMediaService } from '@common/services/match-media.service';
import { map } from 'rxjs/operators';
import { HEADER_HEIGHT_DESK, HEADER_HEIGHT_SMALL } from '@common/utils/consts';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() readonly isMainPage: boolean;
  @Output() readonly clickOpenSideBar = new EventEmitter();
  @Output() readonly goToPrevPage = new EventEmitter();

  readonly headerHeight$ = this._matchMediaService.currentMedia$
    .pipe(map(media => media.small ? HEADER_HEIGHT_SMALL : HEADER_HEIGHT_DESK));

  constructor(private readonly _langService: LangService,
              private readonly _matchMediaService: MatchMediaService) {
  }

  onClickOpenSideBar(): void {
    this.clickOpenSideBar.emit();
  }

  onGoToPrevPage(): void {
    this.goToPrevPage.emit();
  }
}
