import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { SectionsEnum } from '../../artist-page.component';
import { BehaviorSubject } from 'rxjs';
import { log } from 'util';
import { Event } from '@angular/router';

@Component({
  selector: 'app-btn-toggle',
  templateUrl: './btn-toggle.component.html',
  styleUrls: ['./btn-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BtnToggleComponent {

  private readonly _toggleBtnActive$ = new BehaviorSubject<SectionsEnum>(SectionsEnum.Gallery);

  private _swipeXStart: number;
  private _swipeXEnd: number;
  private _swipeTimeXStart: number;
  private _swipeTimeXEnd: number;

  @Output() readonly _clickToggle = new EventEmitter<SectionsEnum>();

  readonly toggleBtnValues: SectionsEnum[] = [
    SectionsEnum.Gallery,
    SectionsEnum.Manifest
  ];

  readonly sectionsEnum = SectionsEnum;
  readonly toggleBtnActive$ = this._toggleBtnActive$.asObservable();

  constructor() {
  }

  clickToggleBtn(): void {
    this._toggleBtnActive$.next(
      this._toggleBtnActive$.value === SectionsEnum.Manifest ? SectionsEnum.Gallery : SectionsEnum.Manifest
    );
    this._clickToggle.emit(this._toggleBtnActive$.value);
  }

  touchstart(event: any): void {
    this._swipeXStart = event.touches[0].clientX;
    this._swipeTimeXStart = new Date().getTime();
  }

  touchend(event: any): void {
    this._swipeXEnd = event.changedTouches[0].clientX;
    this._swipeTimeXEnd = new Date().getTime();
    this.defineSwipe();
  }

  defineSwipe(): void {
    const timeSwipe = this._swipeTimeXEnd - this._swipeTimeXStart;
    if (timeSwipe < 1000) {
      if (this._swipeXStart > this._swipeXEnd) {
        this._toggleBtnActive$.next(this.toggleBtnValues[0]);
      }
      if (this._swipeXEnd > this._swipeXStart) {
        this._toggleBtnActive$.next(this.toggleBtnValues[1]);
      }

      this._clickToggle.emit(this._toggleBtnActive$.value);
    }
  }
}
