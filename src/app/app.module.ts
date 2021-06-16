import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Router, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppInitService } from './app.init.service';
import { HttpClientModule } from '@angular/common/http';
import { CookieModule } from '@gorniv/ngx-universal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ADD_SESSION_HEADERS_INTERCEPTOR_PROVIDER } from '@common/services/api/interceptors/add-session-headers.interceptor';
import { DEFAULT_HEADER_INTERCEPTOR_PROVIDER } from '@common/services/api/interceptors/default-header.interceptor';
import { ENVIRONMENT } from '@common/services/environment.service';
import { environment } from '../environments/environment';
import { SERVER_STATE_INTERCEPTOR_PROVIDER } from '@common/services/api/interceptors/server-state.interceptor';
import { BROWSER_STATE_INTERCEPTOR_PROVIDER } from '@common/services/api/interceptors/browser-state.interceptor';
import { ApplicationModalModule } from '@common/modals/application-modal/application-modal.module';
import { ModalOutletModule } from '@common/components/modal-outlet/modal-outlet.module';
import { PaintingModalModule } from '@common/modals/painting-modal/painting-modal.module';
import { SubscriptionModalModule } from '@common/modals/subscription-modal/subscription-modal.module';
import { ERROR_HANDLING_INTERCEPTOR_PROVIDER } from '@common/services/api/interceptors/error-handling.interceptor';
import * as Sentry from '@sentry/angular';

export function appInit(appInitService: AppInitService): () => Promise<void> {
  return () => appInitService.initApp();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    CookieModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ApplicationModalModule,
    ModalOutletModule,
    PaintingModalModule,
    SubscriptionModalModule
  ],
  providers: [
    {
      provide: ENVIRONMENT,
      useValue: environment
    },
    // {
    //   provide: ErrorHandler,
    //   useValue: Sentry.createErrorHandler({
    //     showDialog: true,
    //   }),
    // },
    // {
    //   provide: Sentry.TraceService,
    //   deps: [Router],
    // },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: () => () => {},
    //   deps: [Sentry.TraceService],
    //   multi: true,
    // },

    // interceptors
    SERVER_STATE_INTERCEPTOR_PROVIDER,
    BROWSER_STATE_INTERCEPTOR_PROVIDER,
    DEFAULT_HEADER_INTERCEPTOR_PROVIDER,
    ADD_SESSION_HEADERS_INTERCEPTOR_PROVIDER,
    ERROR_HANDLING_INTERCEPTOR_PROVIDER,

    AppInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [AppInitService]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
