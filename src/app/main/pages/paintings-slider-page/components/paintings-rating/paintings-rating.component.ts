import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RatingEnum } from '@common/enums/rating.enum';

@Component({
  selector: 'app-paintings-rating',
  templateUrl: './paintings-rating.component.html',
  styleUrls: ['./paintings-rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaintingsRatingComponent {
  private readonly _ratingEnter$ = new BehaviorSubject<number>(null);

  readonly ratingEnter$ = this._ratingEnter$.asObservable();

  readonly ratingsList = [RatingEnum.One, RatingEnum.Two, RatingEnum.Three, RatingEnum.Four, RatingEnum.Five];

  @Input() readonly rating: number;
  @Output() readonly clickRating = new EventEmitter<RatingEnum>();

  ratingLeave(): void {
    this._ratingEnter$.next(null);
  }

  ratingEnter(rating: number): void {
    this._ratingEnter$.next(rating);
  }

  onClickRating(rating: RatingEnum): void {
    this.clickRating.emit(rating);
  }
}
