import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TopArtistsResponseInterface } from '@common/interfaces/api/artists/top-artists-response.interface';
import { ItemTopListInterface } from '@common/interfaces/item-top-list.interface';
import { PageNameEnum } from '@common/enums/page-name.enum';

@Component({
  selector: 'app-top-artists-page',
  templateUrl: './top-artists-page.component.html',
  styleUrls: ['./top-artists-page.component.scss']
})
export class TopArtistsPageComponent implements OnInit {
  private readonly _topArtistsList$ = new BehaviorSubject<ItemTopListInterface[]>([]);
  readonly topArtistsList$ = this._topArtistsList$.asObservable();
  readonly pageNameEnum = PageNameEnum;

  constructor(private readonly _activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const pageData: TopArtistsResponseInterface[] = this._activatedRoute.snapshot.data.pageData;
    if (pageData) {
      const topList: ItemTopListInterface[] = [];
      pageData.forEach(artist => {
        topList.push({
          name_en: artist.name_en,
          name_ru: artist.name_ru,
          rate: artist.rate,
          url: artist.url,
          file: artist.photo
        });
      });
      this._topArtistsList$.next(topList);
    }
  }
}
