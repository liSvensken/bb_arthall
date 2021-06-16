import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { NgxRequest, NgxResponse } from '@gorniv/ngx-universal';

import { AppServerModule } from './src/main.server';
import { existsSync } from 'fs';

import * as compression from 'compression';
import * as cookieparser from 'cookie-parser';

export function app(): any {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/arthall/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  server.use(compression());
  // cokies
  server.use(cookieparser());

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render('index', {
      req,
      res,
      providers: [
        {
          provide: REQUEST,
          useValue: req
        },
        {
          provide: RESPONSE,
          useValue: res
        },
        // for cookie
        {
          provide: NgxRequest,
          useValue: req
        },
        {
          provide: NgxResponse,
          useValue: res
        }
      ]
    });
  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${ port }`);
  });
}

// Webpack will replace 'require' with 'webpack_require'
// 'non_webpack_require' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
