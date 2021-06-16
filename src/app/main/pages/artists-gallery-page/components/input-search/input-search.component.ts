import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputSearchComponent {
  private readonly _focusSearch$ = new BehaviorSubject<boolean>(false);

  @Input() readonly searchControl: FormControl;

  readonly focusSearch$ = this._focusSearch$.asObservable();

  toggleFocusSearch(): void {
    this._focusSearch$.next(!this._focusSearch$.value);
  }
}
