import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { PageNameEnum } from '@common/enums/page-name.enum';
import { DataRoutesInterface } from '@common/interfaces/data-routes.interface';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/paintings-slider-page/paintings-slider-page.module')
          .then(m => m.PaintingsSliderPageModule),
        data: {
          bodyOverflowHidden: true,
          currentPage: PageNameEnum.Main
        } as DataRoutesInterface
      },
      {
        path: PageNameEnum.TopArtists,
        loadChildren: () => import('./pages/top-artists-page/top-artists-page.module')
          .then(m => m.TopArtistsPageModule),
        data: {
          currentPage: PageNameEnum.TopArtists
        } as DataRoutesInterface
      },
      {
        path: PageNameEnum.TopPaintings,
        loadChildren: () => import('./pages/top-paintings-page/top-paintings-page.module')
          .then(m => m.TopPaintingsPageModule),
        data: {
          currentPage: PageNameEnum.TopPaintings
        } as DataRoutesInterface
      },
      {
        path: PageNameEnum.Artists,
        loadChildren: () => import('./pages/artists-gallery-page/artists-gallery-page.module')
          .then(m => m.ArtistsGalleryPageModule),
        data: {
          currentPage: PageNameEnum.Artists
        } as DataRoutesInterface
      },
      {
        path: PageNameEnum.Artists,
        loadChildren: () => import('./pages/artist-page/artist-page.module')
          .then(m => m.ArtistPageModule),
        data: {
          currentPage: PageNameEnum.Artists
        } as DataRoutesInterface
      },
      {
        path: PageNameEnum.AboutProject,
        loadChildren: () => import('./pages/about-project/about-project-page.module')
          .then(m => m.AboutProjectPageModule),
        data: {
          currentPage: PageNameEnum.AboutProject
        } as DataRoutesInterface
      },
      {
        path: PageNameEnum.News,
        loadChildren: () => import('./pages/news-list-page/news-list-page.module')
          .then(m => m.NewsListPageModule),
        data: {
          currentPage: PageNameEnum.News
        } as DataRoutesInterface
      },
      {
        path: PageNameEnum.News,
        loadChildren: () => import('./pages/news-page/news-page.module')
          .then(m => m.NewsPageModule),
        data: {
          currentPage: PageNameEnum.News
        } as DataRoutesInterface
      },
      {
        path: PageNameEnum.Business,
        loadChildren: () => import('./pages/business-page/business-page.module')
          .then(m => m.BusinessPageModule),
        data: {
          currentPage: PageNameEnum.Business
        } as DataRoutesInterface
      },
      {
        path: PageNameEnum.Join,
        loadChildren: () => import('./pages/join-page/join-page.module')
          .then(m => m.JoinPageModule),
        data: {
          currentPage: PageNameEnum.Join
        } as DataRoutesInterface
      },
      {
        path: `${ PageNameEnum.Error }/:errorCode`,
        loadChildren: () => import('./pages/error-page/error-page.module')
          .then(m => m.ErrorPageModule),
        data: {
          currentPage: PageNameEnum.Error
        } as DataRoutesInterface
      },
      {
        path: '**',
        redirectTo: `${ PageNameEnum.Error }/404`
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
