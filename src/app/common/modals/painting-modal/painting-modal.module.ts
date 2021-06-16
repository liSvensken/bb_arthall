import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaintingModalComponent } from '@common/modals/painting-modal/painting-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { FullScreenComponent } from '@common/modals/painting-modal/components/full-screen/full-screen.component';

@NgModule({
  declarations: [
    PaintingModalComponent,
    FullScreenComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  entryComponents: [
    PaintingModalComponent
  ]
})
export class PaintingModalModule {
}
