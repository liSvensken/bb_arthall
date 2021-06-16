import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NewsPageComponent } from './news-page.component';
import { NewsPageResolve } from './news-page.resolve';
import { PipesModule } from '@common/pipes/pipes.module';
import { ScrollPageModule } from '@common/directives/scroll-page/scroll-page.module';

const routes: Routes = [
  {
    path: ':id',
    component: NewsPageComponent,
    resolve: { pageData: NewsPageResolve }
  }
];

@NgModule({
  declarations: [
    NewsPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    PipesModule,
    ScrollPageModule
  ],
  providers: [
    NewsPageResolve
  ]
})
export class NewsPageModule {
}
