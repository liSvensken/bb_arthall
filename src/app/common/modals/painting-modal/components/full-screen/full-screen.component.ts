import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  ViewChild
} from '@angular/core';
import { EnvironmentService } from '@common/services/environment.service';
import { PaintingResponse } from '@common/interfaces/api/paintings/paintings-list-response.interface';
import { PaintingModalInterface } from '@common/interfaces/painting-modal.interface';

const SIZE_STEP = 20;
const START_SIZE = 100;

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullScreenComponent {
  private _currentSize = START_SIZE;
  private _mouseDown = false;
  private _mouseX: number;
  private _mouseY: number;
  @Input() readonly paintingData: PaintingResponse | PaintingModalInterface;
  @Input() readonly isActive: boolean;
  @ViewChild('fullScreenWrapper', { static: true }) readonly fullScreenWrapper: ElementRef;
  @ViewChild('imageFullScreen', { static: true }) readonly imageFullScreen: ElementRef;

  readonly apiBaseUrl = this._environmentService.environment.apiBaseUrl;

  constructor(private readonly _environmentService: EnvironmentService,
              private readonly _renderer: Renderer2) {
  }

  @HostListener('window:mousemove', ['$event']) windowMouseMove(e): void {
    if (this.isActive && this._mouseDown) {
      if (this._mouseX && this._mouseY) {
        this.fullScreenWrapper.nativeElement.scrollTo({
          top: this.fullScreenWrapper.nativeElement.scrollTop + this._mouseY - e.clientY,
          left: this.fullScreenWrapper.nativeElement.scrollLeft + this._mouseX - e.clientX
        });
      }
      this._mouseX = e.clientX;
      this._mouseY = e.clientY;
    }
  }

  @HostListener('window:mousedown', ['$event']) windowMouseDown(e): void {
    if (this.isActive) {
      e.preventDefault();
      this._mouseDown = true;
      this._mouseX = e.clientX;
      this._mouseY = e.clientY;
    }
  }

  @HostListener('window:mouseup', ['$event']) windowMouseUp(): void {
    if (this.isActive) {
      this._mouseDown = false;
    }
  }

  clickBtnZoom(zoom: boolean): void {
    if (zoom) {
      this.setSize(this._currentSize + SIZE_STEP);
    } else {
      this.setSize(this._currentSize - SIZE_STEP);
    }
  }

  resetSize(): void {
    this.setSize(START_SIZE);
  }

  closeFullScreen(): void {
    // todo
    document.exitFullscreen()
      .then(() => console.log('Выход документа из полноэкранного режима'))
      .catch((err) => console.error(err));
  }

  private setSize(size: number): void {
    if (size !== this._currentSize && size >= START_SIZE) {
      const autoScrollCenter =
        this.imageFullScreen.nativeElement.offsetHeight <= innerHeight
        && this.imageFullScreen.nativeElement.offsetWidth <= innerWidth;

      const percentScrollY = autoScrollCenter
        ? 0.5
        : this.fullScreenWrapper.nativeElement.scrollTop / (this.imageFullScreen.nativeElement.offsetHeight - innerHeight);
      const percentScrollX = autoScrollCenter
        ? 0.5
        : this.fullScreenWrapper.nativeElement.scrollLeft / (this.imageFullScreen.nativeElement.offsetWidth - innerWidth);

      const halfDiffSize = Math.abs(size - START_SIZE) / 2;
      const translate = halfDiffSize ? `${ halfDiffSize }vw, ${ halfDiffSize }vh` : '0, 0';
      this._renderer.setStyle(this.imageFullScreen.nativeElement, 'min-width', `${ size }vw`);
      this._renderer.setStyle(this.imageFullScreen.nativeElement, 'min-height', `${ size }vh`);
      this._renderer.setStyle(this.imageFullScreen.nativeElement, 'transform', `translate(${ translate })`);
      this._currentSize = size;

      this.fullScreenWrapper.nativeElement.scrollTo({
        top: (this.imageFullScreen.nativeElement.offsetHeight - innerHeight) * percentScrollY,
        left: (this.imageFullScreen.nativeElement.offsetWidth - innerWidth) * percentScrollX,
        behavior: 'auto'
      });
    }
  }
}
