import { ModalOptionsInterface } from '@common/interfaces/modal-options.interface';
import { ModalName } from '@common/enums/modal-name';
import { Subject } from 'rxjs';
import { Type } from '@angular/core';

export class Modal<TComponent = unknown, TData = unknown> {
  private readonly _destroy$ = new Subject();
  readonly destroy$ = this._destroy$.asObservable();

  readonly id: number;
  readonly name: ModalName;
  readonly componentType: Type<TComponent>;
  component: TComponent;
  readonly options: ModalOptionsInterface<TData>;

  constructor(id: number,
              name: ModalName,
              component: Type<TComponent>,
              options?: ModalOptionsInterface<TData>) {
    this.id = id;
    this.name = name;
    this.componentType = component;
    this.options = options;
  }

  destroy(): void {
    this._destroy$.next();
  }
}
