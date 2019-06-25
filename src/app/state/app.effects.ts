import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { of, Observable, interval, fromEvent} from 'rxjs';
import { map, mergeMap, catchError, switchMap, concatMap} from 'rxjs/operators';
import * as actions from './app.actions'; 
import { Network } from '@ionic-native/network/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { UserBasicFirebaseClass, User, UserClass } from '../models/user';
import { AngularFirestore } from '@angular/fire/firestore';

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

    getUser = createEffect(() => 
      this.actions$.pipe(
        ofType(actions.getUserAction),
        switchMap(action => {
          return this.afAuth.authState
        }),
        map(
          authData => {
            if(authData){
              // User logged in
              const user = new UserBasicFirebaseClass(authData.uid, authData.displayName, authData.phoneNumber, authData.providerId, authData.email);
              return actions.Authenticated({user});
            }
            else return actions.NotAuthenticated();
          }
        )
      )
    );

    getUserDetailedInformation = createEffect(() =>    
    this.actions$.pipe(
      ofType(actions.Authenticated),
      switchMap(action => {
        return this.afStore.collection('/users').doc<User>(action.user.uid).valueChanges().pipe(map(data => [action, data]));
      }),
      map(
        (authData:any) => {
          
          
          if(authData[1]){
            return actions.gotUserDetailedDataAction({user: authData[1]}); //got detailed informations
          }
          else {
            return actions.createDocumentUserDetailedDataAction({user: authData[0].user});
          }
        }
      )
    )
  );

  createFirestoreDocumentUserComplexData = createEffect(() =>    
  this.actions$.pipe(
    ofType(actions.createDocumentUserDetailedDataAction),
    switchMap(action => {
      let fullDoc = new UserClass();
      let objectToBePassed = {
        ...fullDoc,
        ...action.user
      }
      return this.afStore.collection('/users').doc<User>(action.user.uid).set(objectToBePassed);
    }),
    map(
      authData => {
       return actions.setUserDocumentSuccess();
      }
    )
  )
);

  constructor(
    private actions$: Actions,
    private network: Network,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) {}
}