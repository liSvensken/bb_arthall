import { NgModule } from '@angular/core';
import { LazyImgDirective } from '@common/directives/lazy-img/lazy-img.directive';

@NgModule({
  declarations: [
    LazyImgDirective
  ],
  exports: [
    LazyImgDirective
  ]
})
export class LazyImgModule {
}
