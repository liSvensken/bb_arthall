import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  HostListener,
  NgZone,
  OnInit,
  Renderer2,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ClickOutsideDirective } from '../../directives/click-outside/click-outside.directive';
import { IsBrowserService } from '@common/services/is-browser.service';

@UntilDestroy()
@Component({
  selector: 'app-modal-outlet',
  templateUrl: './modal-outlet.component.html',
  styleUrls: ['./modal-outlet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalOutletComponent implements OnInit, AfterViewInit {
  @ViewChild('modal', { static: true, read: ViewContainerRef }) private readonly _modalTemplate: ViewContainerRef;
  @ViewChild('div', { static: false, read: ClickOutsideDirective }) private readonly _div: ClickOutsideDirective;

  constructor(private readonly _modalService: ModalService,
              private readonly _componentFactoryResolver: ComponentFactoryResolver,
              private readonly _elementRef: ElementRef,
              private readonly _isBrowserService: IsBrowserService,
              private readonly _renderer: Renderer2,
              private readonly _ngZone: NgZone) {
  }

  @HostListener('window:scroll') @HostListener('window:resize') eventsWindowScrollOrResize(): void {
    this.calculateModalPosition();
  }

  ngOnInit(): void {
    this._modalService.openedModals$
      .pipe(untilDestroyed(this))
      .subscribe(modals => {
        if (modals.length) {
          this._renderer.addClass(this._elementRef.nativeElement, 'mod-active');
        } else {
          this._renderer.removeClass(this._elementRef.nativeElement, 'mod-active');
        }
      });

    this._modalService.open$
      .pipe(untilDestroyed(this))
      .subscribe(modal => {
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(modal.componentType);
        const componentRef: ComponentRef<any> = this._modalTemplate.createComponent(componentFactory);
        componentRef.instance.modal = modal;
        componentRef.instance.modal.component = componentRef.instance;
        componentRef.changeDetectorRef.markForCheck();
      });

    this._modalService.closeByIndex$
      .pipe(untilDestroyed(this))
      .subscribe(index =>
        this._ngZone.run(() =>
          this._modalTemplate.remove(index)));
  }

  ngAfterViewInit(): void {
    this.calculateModalPosition();
  }

  private calculateModalPosition(): void {
    if (this._isBrowserService.isBrowser && this._elementRef) {
      const scrollTop = pageYOffset || document.documentElement.scrollTop;
      this._renderer.setStyle(this._elementRef.nativeElement, 'top', `${ scrollTop }px`);
      const height = innerHeight ? (`${ innerHeight }px`) : '100vh';
      this._renderer.setStyle(this._elementRef.nativeElement, 'height', height);
    }
  }
}
