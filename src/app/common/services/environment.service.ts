import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { EnvironmentInterface } from '../interfaces/environment.interface';

export const ENVIRONMENT = new InjectionToken<{ [key: string]: any }>('environment');

@Injectable({ providedIn: 'root' })
export class EnvironmentService {
  readonly environment: EnvironmentInterface;

  constructor(@Optional() @Inject(ENVIRONMENT) environment: EnvironmentInterface) {
    this.environment = environment || {} as EnvironmentInterface;
  }
}
