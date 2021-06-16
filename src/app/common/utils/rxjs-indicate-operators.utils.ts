import { defer, Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

export function prepare<T>(callback: () => void): (source: Observable<T>) => Observable<T> {
  return (source: Observable<T>): Observable<T> => defer(() => {
    callback();

    return source;
  });
}

export function indicateLoading<T>(indicator: Subject<boolean>): (source: Observable<T>) => Observable<T> {
  return (source: Observable<T>): Observable<T> => source.pipe(
    prepare(() => indicator.next(true)),
    finalize(() => indicator.next(false))
  );
}

export function indicateState<T, TState>(indicator: Subject<TState>,
                                         startState: TState,
                                         finishState: TState): (source: Observable<T>) => Observable<T> {
  return (source: Observable<T>): Observable<T> => source.pipe(
    prepare(() => indicator.next(startState)),
    finalize(() => indicator.next(finishState))
  );
}
