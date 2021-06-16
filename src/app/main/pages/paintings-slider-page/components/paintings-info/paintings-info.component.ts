import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PaintingResponse } from '@common/interfaces/api/paintings/paintings-list-response.interface';
import { LangEnum } from '@common/enums/lang.enum';
import { PageNameEnum } from '@common/enums/page-name.enum';

@Component({
  selector: 'app-paintings-info',
  templateUrl: './paintings-info.component.html',
  styleUrls: ['./paintings-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaintingsInfoComponent {
  @Input() readonly painting: PaintingResponse;
  @Input() readonly lang: LangEnum;

  readonly pageNameEnum = PageNameEnum;
}
