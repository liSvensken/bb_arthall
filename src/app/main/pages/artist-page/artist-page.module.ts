import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ArtistPageComponent } from './artist-page.component';
import { ArtistPageResolve } from './artist-page.resolve';
import { TranslateModule } from '@ngx-translate/core';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ManifestoComponent } from './components/manifesto/manifesto.component';
import { BtnToggleComponent } from './components/btn-toggle/btn-toggle.component';
import { PipesModule } from '@common/pipes/pipes.module';
import { ScrollPageModule } from '@common/directives/scroll-page/scroll-page.module';
import { ArtistPageGuard } from './artist-page.guard';
import { LazyImgModule } from '@common/directives/lazy-img/lazy-img.module';

const routes: Routes = [
  {
    path: ':artistName',
    component: ArtistPageComponent,
    resolve: { pageData: ArtistPageResolve }
  },
  {
    path: ':artistName/paintings/:paintingId',
    canActivate: [ArtistPageGuard]
  },
  {
    path: ':artistName/paintings',
    redirectTo: ':artistName'
  }
];

@NgModule({
  declarations: [
    ArtistPageComponent,
    GalleryComponent,
    ManifestoComponent,
    BtnToggleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    PipesModule,
    ScrollPageModule,
    LazyImgModule
  ],
  providers: [
    ArtistPageResolve,
    ArtistPageGuard
  ]
})
export class ArtistPageModule {
}
