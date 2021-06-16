import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-manifesto',
  templateUrl: './manifesto.component.html',
  styleUrls: ['./manifesto.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManifestoComponent {
  @Input() readonly manifesto: string;
}
