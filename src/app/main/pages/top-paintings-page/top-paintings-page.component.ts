import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemTopListInterface } from '@common/interfaces/item-top-list.interface';
import { ActivatedRoute } from '@angular/router';
import { TopPaintingsResponseInterface } from '@common/interfaces/api/paintings/top-paintings-response.interface';

@Component({
  selector: 'app-top-paintings-page',
  templateUrl: './top-paintings-page.component.html',
  styleUrls: ['./top-paintings-page.component.scss']
})
export class TopPaintingsPageComponent implements OnInit {
  private readonly _topPaintingsList$ = new BehaviorSubject<ItemTopListInterface[]>([]);
  readonly topPaintingsList$ = this._topPaintingsList$.asObservable();

  constructor(private readonly _activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const pageData: TopPaintingsResponseInterface[] = this._activatedRoute.snapshot.data.pageData;
    if (pageData) {
      const topList: ItemTopListInterface[] = [];
      pageData.forEach(painting => {
        topList.push({
          artist: painting.artist,
          paintingId: painting.id,
          title_ru: painting.title_ru,
          title_en: painting.title_en,
          rate: painting.rate,
          url: painting.artist.url,
          file: painting.file,
          webpack_file: painting.webpack_file,
          watermark_file: painting.watermark_file,
          size: painting.size,
        });
      });
      this._topPaintingsList$.next(topList);
    }
  }
}
