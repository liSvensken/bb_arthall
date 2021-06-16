import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ArtistsApiService } from '@common/services/api/artists-api.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LangService } from '@common/services/lang.service';
import { MetaTagsService } from '@common/services/meta-tags.service';
import { TranslateService } from '@ngx-translate/core';

@UntilDestroy()
@Component({
  selector: 'app-join-page',
  templateUrl: './join-page.component.html',
  styleUrls: ['./join-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JoinPageComponent implements OnInit {
  private readonly _btnDisabled$ = new BehaviorSubject<boolean>(false);

  readonly form = this._fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    links: ['', [Validators.required]],
  });

  readonly btnDisabled$ = this._btnDisabled$.asObservable();

  constructor(private readonly _fb: FormBuilder,
              private readonly _artistsApiService: ArtistsApiService,
              private readonly _seoService: MetaTagsService,
              private readonly _translate: TranslateService,
              private readonly _metaTagsService: MetaTagsService) {
  }

  ngOnInit(): void {
    this._metaTagsService.addMetaTags(
      {
        titleI18n: 'PAGES.JOIN_PAGE.META_TITLE',
        descriptionI18n: 'PAGES.JOIN_PAGE.META_DESCRIPTION'
      });
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this._btnDisabled$.next(true);
      this._artistsApiService.joinArtist(this.form.value)
        .pipe(
          untilDestroyed(this),
          finalize(() => {
            this.form.reset();
            this._btnDisabled$.next(false);
          })
        )
        .subscribe(() => {
        });
    }
  }
}
