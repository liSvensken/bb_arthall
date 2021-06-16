import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AboutProjectPageComponent } from './about-project-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollPageModule } from '@common/directives/scroll-page/scroll-page.module';
import { PipesModule } from '@common/pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: AboutProjectPageComponent
  }
];

@NgModule({
  declarations: [
    AboutProjectPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    ScrollPageModule,
    PipesModule
  ]
})
export class AboutProjectPageModule {
}
