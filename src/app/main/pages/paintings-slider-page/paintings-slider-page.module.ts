import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { PaintingsSliderPageComponent } from './paintings-slider-page.component';
import { PaintingsSliderPageResolve } from './paintings-slider-page.resolve';
import { PaintingsInfoComponent } from './components/paintings-info/paintings-info.component';
import { PaintingsRatingComponent } from './components/paintings-rating/paintings-rating.component';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollPageModule } from '@common/directives/scroll-page/scroll-page.module';
import { ImageToSizeModule } from '@common/directives/image-to-size/image-to-size.module';
import { LazyImgModule } from '@common/directives/lazy-img/lazy-img.module';
import SwiperCore, { A11y, Autoplay, Controller, Navigation, Pagination, Scrollbar, Thumbs, Virtual, Zoom } from 'swiper';
import { PipesModule } from '@common/pipes/pipes.module';

// install Swiper components
SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller
]);

const routes: Routes = [
  {
    path: '',
    component: PaintingsSliderPageComponent,
    resolve: { pageData: PaintingsSliderPageResolve }
  }
];

@NgModule({
  declarations: [
    PaintingsSliderPageComponent,
    PaintingsInfoComponent,
    PaintingsRatingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SwiperModule,
    ReactiveFormsModule,
    TranslateModule,
    ScrollPageModule,
    ImageToSizeModule,
    LazyImgModule,
    PipesModule
  ],
  providers: [
    PaintingsSliderPageResolve
  ]
})
export class PaintingsSliderPageModule {
}
