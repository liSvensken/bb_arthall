import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageNameEnum } from '@common/enums/page-name.enum';
import { map } from 'rxjs/operators';
import { FOOTER_HEIGHT_DESK, FOOTER_HEIGHT_MIDDLE } from '@common/utils/consts';
import { MatchMediaService } from '@common/services/match-media.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  readonly pageNameEnum = PageNameEnum;
  readonly footerHeight$ = this._matchMediaService.currentMedia$
    .pipe(map(media => media.middle ? FOOTER_HEIGHT_MIDDLE : FOOTER_HEIGHT_DESK));

  constructor(private readonly _matchMediaService: MatchMediaService) {
  }
}
