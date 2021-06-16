import { NgModule } from '@angular/core';
import { ImageToSizeDirective } from '@common/directives/image-to-size/image-to-size.directive';

@NgModule({
  declarations: [
    ImageToSizeDirective
  ],
  exports: [
    ImageToSizeDirective
  ]
})
export class ImageToSizeModule {
}
