import { Pipe, PipeTransform } from '@angular/core';
import { LangEnum } from '@common/enums/lang.enum';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { LANGS_ARR } from '@common/utils/langs.utils';

@Pipe({
  name: 'linkForChangeLangPipe'
})
export class LinkForChangeLangPipe implements PipeTransform {
  constructor(private readonly _router: Router) {
  }

  transform(lang: LangEnum): Observable<any[]> {
    return this._router.events
      .pipe(
        startWith(null),
        filter(event => event instanceof NavigationEnd || event === null),
        map(() => {
          let url = this._router.url;

          LANGS_ARR.forEach(langItem => {
            if (url.split('/')[1] === langItem) {
              url = url.replace(`/${ langItem }`, '');
            }
          });

          if (url[0] === '/') {
            url = url.replace('/', '');
          }

          const result = ['/'];
          if (lang) {
            result.push(lang);
          }
          if (url) {
            result.push(...url.split('/'));
          }
          return result;
        })
      );
  }
}
