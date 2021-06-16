import { NgModule } from '@angular/core';
import { ScrollPageDirective } from '@common/directives/scroll-page/scroll-page.directive';

@NgModule({
  declarations: [
    ScrollPageDirective
  ],
  exports: [
    ScrollPageDirective
  ]
})
export class ScrollPageModule {
}
