import { NgModule } from '@angular/core';
import { TopListPageComponent } from '@common/components/top-list-page/top-list-page.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TopItemComponent } from '@common/components/top-list-page/components/top-item/top-item.component';
import { LazyImgModule } from '@common/directives/lazy-img/lazy-img.module';
import { PipesModule } from '@common/pipes/pipes.module';

@NgModule({
  declarations: [
    TopListPageComponent,
    TopItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    LazyImgModule,
    PipesModule
  ],
  exports: [
    TopListPageComponent
  ]
})
export class TopListPageModule {
}
