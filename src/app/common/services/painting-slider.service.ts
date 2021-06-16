import { Injectable } from '@angular/core';
import { PaintingResponse } from '@common/interfaces/api/paintings/paintings-list-response.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaintingSliderService {
  private readonly _paintingsList$ = new BehaviorSubject<PaintingResponse[]>([]);
  private readonly _currentSlideNumber$ = new BehaviorSubject<number>(0);

  readonly currentSlideNumber$ = this._currentSlideNumber$.asObservable();

  getPaintingsList(): PaintingResponse[] {
    return this._paintingsList$.value;
  }

  setPaintingsList(paintingsList: PaintingResponse[]): void {
    this._paintingsList$.next(paintingsList);
  }

  getCurrentSlideNumber(): number {
    return this._currentSlideNumber$.value;
  }

  setCurrentSlideNumber(currentSlideNumber: number): void {
    this._currentSlideNumber$.next(currentSlideNumber);
  }
}
