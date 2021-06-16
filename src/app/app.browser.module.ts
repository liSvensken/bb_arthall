import { NgModule } from '@angular/core';
import { BrowserTransferStateModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { StateTransferInitializerModule } from '@nguniversal/common';
import { I18nBrowserModule } from './i18n/i18n.browser.module';

// the Request object only lives on the server
export function getRequest(): any {
  return { headers: { cookie: document.cookie } };
}

@NgModule({
  imports: [
    I18nBrowserModule,
    AppModule,
    StateTransferInitializerModule,
    BrowserTransferStateModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      // The server provides these in main.server
      provide: REQUEST,
      useFactory: getRequest
    },
    { provide: 'ORIGIN_URL', useValue: location.origin }
  ]
})
export class AppBrowserModule {
}
