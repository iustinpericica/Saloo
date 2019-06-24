import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { of, Observable, interval, fromEvent } from 'rxjs';
import { map, mergeMap, catchError, switchMap, concatMap } from 'rxjs/operators';
import * as actions from './app.actions'; 
import { Network } from '@ionic-native/network/ngx';

@Injectable()
export class RootEffects {
 
  public interval:Observable<number>;
  public event: Observable<any>;

  watchOnline = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.watchNetworkConnection),
      switchMap(action => {
          return this.network.onConnect().pipe(map(x => 12));
      }),
      map(
          action => {
              console.log('connected');
              return actions.networkConnect()
          }
      )
    )
    );

    watchOffline = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.watchNetworkConnection),
      switchMap(action => {
        return this.network.onDisconnect().pipe(map(x => 12));
      }),
      map(
          action => {
              console.log('disconnected');
              return actions.networkDisconnect()
          }
      )
    )
    );

  constructor(
    private actions$: Actions,
    private network: Network
  ) {
    this.interval = interval(5000);
    this.event = fromEvent(document, 'click');
  }
}