import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TopArtistsPageResolve } from './top-artists-page.resolve';
import { TopArtistsPageComponent } from './top-artists-page.component';
import { TopListPageModule } from '@common/components/top-list-page/top-list-page.module';
import { ScrollPageModule } from '@common/directives/scroll-page/scroll-page.module';

const routes: Routes = [
  {
    path: '',
    component: TopArtistsPageComponent,
    resolve: { pageData: TopArtistsPageResolve }
  }
];

@NgModule({
  declarations: [
    TopArtistsPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TopListPageModule,
    ScrollPageModule
  ],
  providers: [
    TopArtistsPageResolve
  ]
})
export class TopArtistsPageModule {
}
