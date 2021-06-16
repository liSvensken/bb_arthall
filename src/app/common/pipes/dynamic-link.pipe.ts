import { Pipe, PipeTransform } from '@angular/core';
import { LangService } from '@common/services/lang.service';
import { LangEnum } from '@common/enums/lang.enum';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Pipe({
  name: 'dynamicLink'
})
export class DynamicLinkPipe implements PipeTransform {
  constructor(private readonly _langService: LangService) {
  }

  transform(value: any[]): Observable<any[]> {
    return this._langService.lang$
      .pipe(
        filter(lang => !!lang),
        map(lang => {
          if (lang === LangEnum.Ru) {
            if (value[0] === '/') {
              value.shift();
            }
            return ['/', LangEnum.Ru, ...value];
          } else {
            return value;
          }
        })
      );
  }
}
