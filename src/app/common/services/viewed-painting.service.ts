import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ViewedPaintingService {
  private _viewedPaintingsArr: number[] = [];

  paintingWasViewed(id: number): boolean {
    return this._viewedPaintingsArr.includes(id);
  }

  addPaintingsAsViewed(id: number): void {
    this._viewedPaintingsArr.push(id);
  }
}
