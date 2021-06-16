import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { CommonModule } from '@angular/common';
import { MainLayoutModule } from './main-layout/main-layout.module';

@NgModule({
  imports: [
    CommonModule,
    MainLayoutModule,
    MainRoutingModule
  ]
})
export class MainModule {
}
