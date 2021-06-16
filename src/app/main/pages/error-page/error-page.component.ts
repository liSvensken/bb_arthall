import { Component, Inject, OnInit, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IsBrowserService } from '@common/services/is-browser.service';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response } from 'express';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  private readonly _errorCode$ = new BehaviorSubject<number>(null);

  readonly errorNumber$ = this._errorCode$.asObservable();

  constructor(private readonly _router: Router,
              private readonly _activatedRoute: ActivatedRoute,
              private readonly _isBrowserService: IsBrowserService,
              @Optional() @Inject(RESPONSE) private _response: Response) {
  }

  ngOnInit(): void {
    const errorCode = +this._activatedRoute.snapshot.params.errorCode || 404;
    this._errorCode$.next(errorCode);

    if (!this._isBrowserService.isBrowser) {
      this._response.status(404);
    }
  }

  bntClick(): void {
    this._router.navigate(['/']);
  }
}
