import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Store, select } from '@ngrx/store';
import * as fromState from './state/index'
import * as stateActions from './state/app.actions';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { User, UserClass } from './models/user';
import { Network } from '@ionic-native/network/ngx';
import { ToastController } from '@ionic/angular';
import { pages } from './shared/pages';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{


  public appPages:any = pages;

  public ngOnInit():void{

  this.store.select(fromState.selectUserLoggedIn).subscribe((loggedIn:boolean) => {
    if(loggedIn){
      this.appPages[2].title = "Contul meu";
      this.appPages[2].url = '/my-account';
    }
    else {
      this.appPages[2].title = "Autentificati-va sau creati un cont";
      this.appPages[2].url = '/login';
    }
  })

  }



  onDestroy():void{

  }

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private store: Store<fromState.AppState>,
    public toastController: ToastController
  ) {
    this.initializeApp();
  }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  initializeApp() {


    this.store.select(fromState.selectNetWorkData).subscribe(data => {
        console.log(data.lastNetworkConnectionStatus, data.networkConnectionStatus);
        if(data.lastNetworkConnectionStatus != data.networkConnectionStatus){
          let message = data.networkConnectionStatus == true ? "Sunteţi din nou online" : "Sunteţi offline";
          this.presentToast(message);
        }
    });
    
    this.platform.ready().then(() => {

      this.store.dispatch(stateActions.getUserAction());

      // platform specific design.. |
      if(this.platform.is('cordova')){
        this.splashScreen.hide();
        this.statusBar.backgroundColorByHexString('#0048ce');
        this.statusBar.styleLightContent();
        this.store.dispatch(stateActions.watchNetworkConnection()); //watch network by ngrx
      }

    });
  }
}
