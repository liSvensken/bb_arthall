import { ComponentFactoryResolver, Injectable, Type } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ModalOptionsInterface } from '@common/interfaces/modal-options.interface';
import { Modal } from '@common/services/modal/modal';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { ModalName } from '@common/enums/modal-name';
import { Location } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private incId = 1;
  private readonly _openedModals$ = new BehaviorSubject<Modal[]>([]);
  private readonly _open$ = new Subject<Modal>();
  private readonly _closeByIndex$ = new Subject<number>();
  private readonly _changeUrl$ = new Subject();

  readonly openedModals$ = this._openedModals$.asObservable();
  readonly open$ = this._open$.asObservable();
  readonly closeByIndex$ = this._closeByIndex$.asObservable();
  readonly changeUrl$ = this._changeUrl$.asObservable();

  get openedModals(): Modal[] {
    return this._openedModals$.value;
  }

  constructor(private readonly _router: Router,
              private readonly _componentFactoryResolver: ComponentFactoryResolver,
              readonly location: Location) {
    this._router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this._changeUrl$.next());
  }

  open<TDataIn = unknown, TComponent = unknown>(
    component: Type<TComponent>,
    modalName: ModalName,
    options?: ModalOptionsInterface<TDataIn>
  ): Modal<TComponent, TDataIn> {
    const openedModals = [...this._openedModals$.value];
    const newModal = new Modal<TComponent, TDataIn>(this.incId, modalName, component, getDefaultOptions(options));
    openedModals.push(newModal);
    this._openedModals$.next(openedModals);
    this._open$.next(newModal);
    this.incId++;

    return newModal;
  }

  closeByFocus(): void {
    const lastIndex = this._openedModals$.value.length - 1;
    const openedModals = [...this._openedModals$.value];
    openedModals.pop();
    this._openedModals$.next(openedModals);
    this._closeByIndex$.next(lastIndex);
  }

  closeByName(modalName: ModalName): void {
    const openedModals = [...this._openedModals$.value];
    const index = openedModals.findIndex(modal => modal.name === modalName);
    if (index > -1) {
      openedModals.splice(index, 1);
      this._openedModals$.next(openedModals);
      this._closeByIndex$.next(index);
    }
  }

  getOpenedModalByName(modalName: ModalName): Modal {
    return this._openedModals$.value.find(modal => modal.name === modalName);
  }
}

function getDefaultOptions(options?: ModalOptionsInterface): ModalOptionsInterface {
  return {
    closeByEsc: options?.closeByEsc ?? true,
    closeByOut: options?.closeByOut ?? true,
    data: options?.data
  };
}
