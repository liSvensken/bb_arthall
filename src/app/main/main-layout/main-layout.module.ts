import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from './components/footer/footer.component';
import { ClickOutsideModule } from '@common/directives/click-outside/click-outside.module';
import { ApplicationComponent } from './components/common/application/application.component';
import { ToggleLangComponent } from './components/side-bar/components/toggle-lang/toggle-lang.component';
import { SideBarBodyComponent } from './components/side-bar/components/side-bar-body/side-bar-body.component';
import { GlobalLoaderComponent } from './components/global-loader/global-loader.component';
import { PipesModule } from '@common/pipes/pipes.module';
import { SelectComponent } from './components/header/components/select/select.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    ApplicationComponent,
    SideBarBodyComponent,
    ToggleLangComponent,
    GlobalLoaderComponent,
    SelectComponent
  ],
  exports: [
    ApplicationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    ClickOutsideModule,
    PipesModule
  ]
})
export class MainLayoutModule {
}
