import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Directive({
  selector: '[appImageToSize]'
})
export class ImageToSizeDirective implements OnInit {
  @Input() private readonly _imageWidth: number;
  @Input() private readonly _imageHeight: number;
  @Input() private readonly _requiredWidth$: Observable<number>;
  @Input() private readonly _requiredHeight$: Observable<number>;

  private _requiredWidth: number;
  private _requiredHeight: number;

  private _returnWidth: number;
  private _returnHeight: number;

  constructor(private readonly _elem: ElementRef,
              private readonly _renderer: Renderer2) {
  }

  ngOnInit(): void {
    this._requiredWidth$
      .pipe(untilDestroyed(this))
      .subscribe(requiredWidth => {
        this._requiredWidth = requiredWidth;
        this.setImageSize();
      });

    this._requiredHeight$
      .pipe(untilDestroyed(this))
      .subscribe(requiredHeight => {
        this._requiredHeight = requiredHeight;
        this.setImageSize();
      });
  }

  setImageSize(): void {
    switch (true) {
      case (this._imageWidth > this._requiredWidth):
        this.setByRatio();
        break;

      case (this._imageWidth <= this._requiredWidth) && (this._imageHeight >= this._requiredHeight):
        this.setToRequiredHeight();
        break;

      case (this._imageWidth <= this._requiredWidth) && (this._imageHeight <= this._requiredHeight):
        this.setByRatio();
        break;
    }

    this._renderer.setStyle(this._elem.nativeElement, 'width', this._returnWidth + 'px');
    this._renderer.setStyle(this._elem.nativeElement, 'height', this._returnHeight + 'px');
  }

  setToRequiredWidth(): void {
    this._returnWidth = this._requiredWidth;
    this._returnHeight = this._requiredWidth * this._imageHeight / this._imageWidth;
  }

  setToRequiredHeight(): void {
    this._returnWidth = this._imageWidth * this._requiredHeight / this._imageHeight;
    this._returnHeight = this._requiredHeight;
  }

  setByRatio(): void {
    const ratioWidth = this._imageWidth / this._requiredWidth;
    const ratioHeight = this._imageHeight / this._requiredHeight;
    if (ratioWidth > ratioHeight) {
      this.setToRequiredWidth();
    } else {
      this.setToRequiredHeight();
    }
  }
}
