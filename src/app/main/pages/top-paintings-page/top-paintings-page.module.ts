import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TopListPageModule } from '@common/components/top-list-page/top-list-page.module';
import { TopPaintingsPageResolve } from './top-paintings-page.resolve';
import { TopPaintingsPageComponent } from './top-paintings-page.component';
import { ScrollPageModule } from '@common/directives/scroll-page/scroll-page.module';

const routes: Routes = [
  {
    path: '',
    component: TopPaintingsPageComponent,
    resolve: { pageData: TopPaintingsPageResolve }
  }
];

@NgModule({
  declarations: [
    TopPaintingsPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TopListPageModule,
    ScrollPageModule
  ],
  providers: [
    TopPaintingsPageResolve
  ]
})
export class TopPaintingsPageModule {
}
