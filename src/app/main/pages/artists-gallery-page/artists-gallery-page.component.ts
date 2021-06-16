import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ArtistsApiService } from '@common/services/api/artists-api.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormBuilder } from '@angular/forms';
import { ArtistReducedResponseInterface } from '@common/interfaces/api/artists/artist-reduced.response.interface';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { LANGS_ARR } from '@common/utils/langs.utils';
import { LangService } from '@common/services/lang.service';
import { debounceTime, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistsWithSymbol } from '@common/interfaces/artists-with-symbol.interface';
import { TranslateService } from '@ngx-translate/core';
import { SeoSocialShareData, SeoSocialShareService } from 'ngx-seo';
import { MetaTagsService } from '@common/services/meta-tags.service';

type ArtistsWithSymbolMapByLang = { [key: string]: ArtistsWithSymbol[] };

@UntilDestroy()
@Component({
  selector: 'app-artists-gallery-page',
  templateUrl: './artists-gallery-page.component.html',
  styleUrls: ['./artists-gallery-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistsGalleryPageComponent implements OnInit {
  private readonly _artistsMapByLang$ = new BehaviorSubject<ArtistsWithSymbolMapByLang>({});
  private readonly _viewedArtists$ = new BehaviorSubject<ArtistsWithSymbol[]>([]);

  readonly searchControl = this._fb.control(null);
  readonly viewedArtists$ = this._viewedArtists$.asObservable();
  readonly lang$ = this._langService.lang$;

  constructor(private readonly _artistsApiService: ArtistsApiService,
              private readonly _activatedRoute: ActivatedRoute,
              private readonly _router: Router,
              private readonly _fb: FormBuilder,
              private readonly _langService: LangService,
              private readonly _seoSocialShareService: SeoSocialShareService,
              private readonly _translate: TranslateService,
              private readonly _metaTagsService: MetaTagsService) {
  }

  ngOnInit(): void {
    this._metaTagsService.addMetaTags({
      titleI18n: 'PAGES.ARTISTS_GALLERY_PAGE.META_TITLE',
      descriptionI18n: 'PAGES.ARTISTS_GALLERY_PAGE.META_DESCRIPTION'
    });

    const pageData: ArtistReducedResponseInterface[] = this._activatedRoute.snapshot.data.pageData;
    if (pageData) {
      this.lang$
        .pipe(untilDestroyed(this))
        .subscribe((currentLang) => {
          const artistsWithSymbolMapByLang: ArtistsWithSymbolMapByLang = {};

          LANGS_ARR.forEach(lang => {
            const artistsMapByFirstSymbol: { [key: string]: ArtistReducedResponseInterface[] } = {};
            pageData.forEach(artist => {
              const mapItem = artistsMapByFirstSymbol[artist[`name_${ lang }`][0]];
              if (mapItem) {
                mapItem.push(artist);
              } else {
                artistsMapByFirstSymbol[artist[`name_${ lang }`][0]] = [artist];
              }
            });

            const artistsWithSymbolArr: ArtistsWithSymbol[] = [];
            Object.keys(artistsMapByFirstSymbol).forEach(key => {
              const mapArtistItem = {
                symbol: key,
                list: artistsMapByFirstSymbol[key]
              };
              artistsWithSymbolArr.push(mapArtistItem);
            });

            artistsWithSymbolArr.sort((a, b) => {
              b.list.sort((listA, listB) =>
                listA[`name_${ lang }`][0].localeCompare(listB[`name_${ lang }`][0]));
              return a.symbol.localeCompare(b.symbol);
            });

            artistsWithSymbolMapByLang[lang] = artistsWithSymbolArr;
          });

          this._artistsMapByLang$.next(artistsWithSymbolMapByLang);
          this._viewedArtists$.next(artistsWithSymbolMapByLang[currentLang]);
        });
    }

    combineLatest([
      this.searchControl.valueChanges.pipe(
        debounceTime(300),
        map(dataSearch => dataSearch.trim().toLowerCase())
      ),
      this.lang$
    ])
      .pipe(
        untilDestroyed(this)
      )
      .subscribe(([dataSearch, currentLang]) => {
        if (dataSearch) {
          const filteredArtistsWithSymbol: ArtistsWithSymbol[] = [];
          this._artistsMapByLang$.value[currentLang].forEach(artistsWithSymbol => {
            const filteredList = artistsWithSymbol.list.filter(artists =>
              artists['name_' + currentLang].trim().toLowerCase().includes(dataSearch));
            if (filteredList.length) {
              filteredArtistsWithSymbol.push({ symbol: artistsWithSymbol.symbol, list: filteredList });
            }
          });
          this._viewedArtists$.next(filteredArtistsWithSymbol);
        } else {
          this._viewedArtists$.next(this._artistsMapByLang$.value[currentLang]);
        }
      });
  }
}
