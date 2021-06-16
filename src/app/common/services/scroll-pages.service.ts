import { Injectable } from '@angular/core';
import { ScrollPagesInterface } from '@common/interfaces/scroll-pages.interface';

@Injectable({ providedIn: 'root' })
export class ScrollPagesService {
  private readonly _scrollPagesMap = {} as { [key: string]: ScrollPagesInterface };

  get(key: string): ScrollPagesInterface {
    return this._scrollPagesMap[key];
  }

  save(key: string, scrollX, scrollY): void {
    this._scrollPagesMap[key] = { scrollX, scrollY };
  }
}
