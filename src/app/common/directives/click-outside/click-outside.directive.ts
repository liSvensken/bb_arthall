import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { checkExistParent } from '../../utils/check-exist-parent.utils';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {
  @Output() readonly clickOutside = new EventEmitter();

  constructor(private readonly _elem: ElementRef) {
  }

  @HostListener('window:click', ['$event']) documentClick(event: MouseEvent): void {
    if (!checkExistParent(event.target, this._elem.nativeElement)) {
      this.clickOutside.emit();
    }
  }
}
