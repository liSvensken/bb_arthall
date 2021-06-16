import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { CookieBackendService, CookieService } from '@gorniv/ngx-universal';
import { I18nServerModule } from './i18n/i18n.server.module';

@NgModule({
  imports: [
    I18nServerModule,
    AppModule,
    ServerModule,
    ServerTransferStateModule
  ],
  providers: [
    { provide: CookieService, useClass: CookieBackendService }
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {
}
