import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { JoinPageComponent } from './join-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollPageModule } from '@common/directives/scroll-page/scroll-page.module';
import { PipesModule } from '@common/pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: JoinPageComponent
  }
];

@NgModule({
  declarations: [
    JoinPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    ReactiveFormsModule,
    ScrollPageModule,
    PipesModule
  ]
})
export class JoinPageModule {
}
