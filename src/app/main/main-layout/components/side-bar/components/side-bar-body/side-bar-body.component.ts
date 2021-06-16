import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LangEnum } from '@common/enums/lang.enum';
import { PageNameEnum } from '@common/enums/page-name.enum';

@Component({
  selector: 'app-side-bar-body',
  templateUrl: './side-bar-body.component.html',
  styleUrls: ['./side-bar-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideBarBodyComponent {
  @Output() readonly isOpenLangToggle = new EventEmitter();
  @Input() readonly currentLang: LangEnum;

  readonly langEnum = LangEnum;
  readonly pageNameEnum = PageNameEnum;

  openLangToggle(): void {
    this.isOpenLangToggle.emit();
  }
}
