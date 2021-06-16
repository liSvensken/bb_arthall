import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../services/modal/modal.service';
import { Subject } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { skip, withLatestFrom } from 'rxjs/operators';
import { Modal } from '../services/modal/modal';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

@UntilDestroy()
@Component({ template: '' })
export abstract class ModalBase<TDataIn = unknown> implements OnInit, OnDestroy {
  protected readonly _close$ = new Subject();
  protected _skipChangeUrl = 0;

  @Input() readonly modal: Modal<unknown, TDataIn>;
  data: TDataIn;

  protected constructor(protected readonly _modalService: ModalService,
                        private readonly _elementRef: ElementRef) {
  }

  @HostListener('window:click', ['$event']) windowClick(event: MouseEvent): void {
    const target: Element = event.target as Element;

    switch (true) {
      case target.classList.contains('gl-modal-btn-close'):
      case target.classList.contains('gl-main-btn'):
        this.close();
        break;

      case target.classList.contains('gl-modal-wrapper') && this.modal?.options?.closeByOut:
        this.close();
    }
  }

  @HostListener('window:keydown.esc') windowKeydownEsc(): void {
    if (this.modal?.options?.closeByEsc) {
      this.close();
    }
  }

  ngOnInit(): void {
    this._modalService.changeUrl$
      .pipe(
        skip(this._skipChangeUrl),
        untilDestroyed(this)
      )
      .subscribe(() => this.close());

    this.data = this.modal.options?.data;

    this._close$
      .pipe(
        withLatestFrom(this._modalService.openedModals$),
        untilDestroyed(this)
      )
      .subscribe(([, openedModals]) => {
        if (openedModals[openedModals.length - 1].id === this.modal.id) {
          this._modalService.closeByFocus();
        }
      });

    disableBodyScroll(this._elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    enableBodyScroll(this._elementRef.nativeElement);
    this.modal.destroy();
  }

  close(): void {
    this._close$.next();
  }
}
