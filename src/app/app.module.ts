import '../polyfills';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

//Native
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
// End Native

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

//ngRx

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { rootReducer } from './state/app.reducer';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RootEffects } from './state/app.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmCoreModule } from '@agm/core';

const devTools = {
  name: 'APM Demo App DevTools',
  maxAge: 25,
  logOnly: environment.production,
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase, 'Saloo'),
    StoreModule.forRoot({
      root:rootReducer
    }),
    StoreDevtoolsModule.instrument(devTools),
    NgCircleProgressModule.forRoot({}),
    AngularFirestoreModule,
    EffectsModule.forRoot([RootEffects]),
    MatGoogleMapsAutocompleteModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

