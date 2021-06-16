import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ApplicationModalComponent } from '@common/modals/application-modal/application-modal.component';
import { MainLayoutModule } from '../../../main/main-layout/main-layout.module';

@NgModule({
  declarations: [
    ApplicationModalComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MainLayoutModule
  ],
  entryComponents: [
    ApplicationModalComponent
  ]
})
export class ApplicationModalModule {
}
