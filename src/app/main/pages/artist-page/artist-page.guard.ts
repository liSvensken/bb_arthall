import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { QueryParamsEnum } from '@common/enums/query-params.enum';
import { PageNameEnum } from '@common/enums/page-name.enum';

@Injectable()
export class ArtistPageGuard implements CanActivate, CanActivateChild {
  constructor(private readonly _router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const artistName = route.params.artistName;
    const paintingId = route.params[QueryParamsEnum.PaintingId];
    this._router.navigate(['/', PageNameEnum.Artists, artistName], { queryParams: { paintingId } });
    return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }
}
