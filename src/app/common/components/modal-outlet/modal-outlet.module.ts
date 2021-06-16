import { NgModule } from '@angular/core';
import { ModalOutletComponent } from '@common/components/modal-outlet/modal-outlet.component';
import { ClickOutsideModule } from '@common/directives/click-outside/click-outside.module';

@NgModule({
  declarations: [
    ModalOutletComponent
  ],
  imports: [
    ClickOutsideModule
  ],
  exports: [
    ModalOutletComponent
  ]
})
export class ModalOutletModule {
}
