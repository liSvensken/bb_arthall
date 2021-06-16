import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NewsListPageComponent } from './news-list-page.component';
import { NewsListPageResolve } from './news-list-page.resolve';
import { NewsItemComponent } from './components/news-item/news-item.component';
import { ScrollPageModule } from '@common/directives/scroll-page/scroll-page.module';
import { PipesModule } from '@common/pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: NewsListPageComponent,
    resolve: { pageData: NewsListPageResolve }
  }
];

@NgModule({
  declarations: [
    NewsListPageComponent,
    NewsItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    ScrollPageModule,
    PipesModule
  ],
  providers: [
    NewsListPageResolve
  ]
})
export class NewsListPageModule {
}
