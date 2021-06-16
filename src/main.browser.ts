import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppBrowserModule } from './app/app.browser.module';
import { environment } from './environments/environment';
import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';

// Sentry.init({
//   dsn: 'https://2791d955a69d449cadf1c5868a50a791@sentry.xn--80ajbekothchmme5j.xn--p1ai/9',
//   integrations: [
//     new Integrations.BrowserTracing({
//       tracingOrigins: ['http://localhost', 'https://arthall.online/'],
//       routingInstrumentation: Sentry.routingInstrumentation,
//     }),
//   ],
//
//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
// });

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic()
    .bootstrapModule(AppBrowserModule)
    .catch(err => {
      console.error(err);
    });
});
