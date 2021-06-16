import { Injectable } from '@angular/core';
import { filter, map, mergeMap, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataRoutesInterface } from '@common/interfaces/data-routes.interface';
import { PageNameEnum } from '@common/enums/page-name.enum';

@Injectable({ providedIn: 'root' })
export class RoutesActiveService {
  private readonly _dataRoutes$ = new BehaviorSubject<DataRoutesInterface>({} as DataRoutesInterface);
  readonly dataRoutes$ = this._dataRoutes$.asObservable();
  readonly currentPage$: Observable<PageNameEnum> = this._dataRoutes$
    .pipe(
      map(dataRoutes => dataRoutes.currentPage),
      shareReplay(1)
    );

  constructor(private readonly _router: Router,
              private readonly _activatedRoute: ActivatedRoute) {
    this._router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this._activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)
      )
      .subscribe((data: DataRoutesInterface) => {
        this._dataRoutes$.next(data || {} as DataRoutesInterface);
      });
  }
}
