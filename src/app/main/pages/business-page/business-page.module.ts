import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BusinessPageComponent } from './business-page.component';
import { ScrollPageModule } from '@common/directives/scroll-page/scroll-page.module';
import { BusinessPageResolve } from './business-page.resolve';
import { PipesModule } from '@common/pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: BusinessPageComponent,
    resolve: { pageData: BusinessPageResolve }
  }
];

@NgModule({
  declarations: [
    BusinessPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    ScrollPageModule,
    PipesModule
  ],
  providers: [
    BusinessPageResolve
  ]
})
export class BusinessPageModule {
}
