import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GlobalLoaderService } from '@common/services/global-loader.service';

@Component({
  selector: 'app-global-loader',
  templateUrl: './global-loader.component.html',
  styleUrls: ['./global-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalLoaderComponent {
  readonly isActive$ = this._globalLoaderService.isActive$;

  constructor(private readonly _globalLoaderService: GlobalLoaderService) {
  }
}
