import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LangEnum } from '../../../../../../common/enums/lang.enum';
import { BehaviorSubject } from 'rxjs';

interface LangModelInterface {
  name: string;
  value: LangEnum;
  urlParam: string | null
}

const LANG_MODELS: LangModelInterface[] = [
  {
    name: 'Русский',
    value: LangEnum.Ru,
    urlParam: LangEnum.Ru,
  },
  {
    name: 'English',
    value: LangEnum.En,
    urlParam: null
  }
];

@Component({
  selector: 'app-toggle-lang',
  templateUrl: './toggle-lang.component.html',
  styleUrls: ['./toggle-lang.component.scss']
})
export class ToggleLangComponent {
  private readonly _langModels$ = new BehaviorSubject<LangModelInterface[]>(LANG_MODELS);
  @Output() readonly _isCloseLangToggle = new EventEmitter();
  @Output() readonly _changeLang = new EventEmitter<LangEnum>();

  @Input() readonly currentLang: LangEnum;

  readonly langModels$ = this._langModels$.asObservable();
  readonly langEnum = LangEnum;

  closeLangToggle(): void {
    this._isCloseLangToggle.emit();
  }

  changeLang(langValue): void {
    this._changeLang.emit(langValue);
  }
}
