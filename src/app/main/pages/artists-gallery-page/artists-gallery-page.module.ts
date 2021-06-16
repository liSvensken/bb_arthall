import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ArtistsGalleryPageComponent } from './artists-gallery-page.component';
import { InputSearchComponent } from './components/input-search/input-search.component';
import { ArtistsListComponent } from './components/artists-list/artists-list.component';
import { ArtistsGalleryPageResolve } from './artists-gallery-page.resolve';
import { ScrollPageModule } from '@common/directives/scroll-page/scroll-page.module';
import { PipesModule } from '@common/pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: ArtistsGalleryPageComponent,
    resolve: { pageData: ArtistsGalleryPageResolve }
  }
];

@NgModule({
  declarations: [
    ArtistsGalleryPageComponent,
    InputSearchComponent,
    ArtistsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    ReactiveFormsModule,
    ScrollPageModule,
    PipesModule
  ],
  providers: [
    ArtistsGalleryPageResolve
  ]
})
export class ArtistsGalleryPageModule {
}
