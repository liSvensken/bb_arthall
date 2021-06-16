import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EnvironmentService } from '@common/services/environment.service';
import { LangService } from '@common/services/lang.service';
import { IsBrowserService } from '@common/services/is-browser.service';
import { PageNameEnum } from '@common/enums/page-name.enum';
import { ArtistsWithSymbol } from '@common/interfaces/artists-with-symbol.interface';
import { ArtistReducedResponseInterface } from '@common/interfaces/api/artists/artist-reduced.response.interface';

@Component({
  selector: 'app-artists-list',
  templateUrl: './artists-list.component.html',
  styleUrls: ['./artists-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistsListComponent {
  @Input() artistsWithSymbol: ArtistsWithSymbol[];
  readonly apiBaseUrl = this._environmentService.environment.apiBaseUrl;
  readonly lang$ = this._langService.lang$;
  readonly isBrowser = this._isBrowserService.isBrowser;
  readonly pageNameEnum = PageNameEnum;

  constructor(private readonly _environmentService: EnvironmentService,
              private readonly _langService: LangService,
              private readonly _isBrowserService: IsBrowserService) {
  }

  onErrorPhoto(artistsWithSymbolList: ArtistReducedResponseInterface[], artistWithErrorId: number): void {
    artistsWithSymbolList.map(artist => {
      if (artist.id === artistWithErrorId) {
        artist.photo = '';
      }
    });
  }
}
