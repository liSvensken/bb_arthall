import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IsBrowserService } from '@common/services/is-browser.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationComponent {
  @Input() fullPhoneImage = false;

  readonly isBrowser = this._isBrowserService.isBrowser;

  constructor(private readonly _isBrowserService: IsBrowserService) {
  }
}
