import { NgModule } from '@angular/core';
import { SanitizePipe } from '@common/pipes/sanitize.pipe';
import { DynamicLinkPipe } from '@common/pipes/dynamic-link.pipe';
import { LinkForChangeLangPipe } from '@common/pipes/link-for-change-lang.pipe';

@NgModule({
  declarations: [
    SanitizePipe,
    DynamicLinkPipe,
    LinkForChangeLangPipe
  ],
  exports: [
    SanitizePipe,
    DynamicLinkPipe,
    LinkForChangeLangPipe
  ]
})
export class PipesModule {
}
