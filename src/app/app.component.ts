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
import { User, UserClass } from './login/models/user';
import { Network } from '@ionic-native/network/ngx';
import { ToastController } from '@ionic/angular';
import { pages } from './shared/pages';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{

  public disconnectSubscription;
  public connectSubscription;
  public lastInternet:boolean = true; // true = connectedToIntternet
  public ngOnInit():void{


    //this.store.dispatch(new stateActions.LogIn());
    this.afAuth.user.subscribe((user) => {
      /*
      if(!user)this.store.dispatch(new stateActions.LogOut());
      else this.store.dispatch(new stateActions.LogIn(user))
      */
     if(user){
       /*
       console.log(user);
       this.store.dispatch(new stateActions.LogIn());

       this.afStore.collection('/users').doc<User>(user.uid).valueChanges().subscribe(data => {

          this.store.dispatch(new stateActions.SetUserData(data))

       });
       if(user.providerData[0].providerId == 'google.com' || user.providerData[0].providerId == 'facebook.com'){

        let userToBeSent:User = {
          uid: user.uid,
          email:user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
          provider: user.providerData[0].providerId
        }

        let UserEmpty = new UserClass();
          this.createUser({
            ...UserEmpty,
            ...userToBeSent
          });
      }
      else {
        let userToBeSent:User = {
          uid: user.uid,
          email:user.email,
          emailVerified:false,
          provider: 'e-mail'
        }
        
        let UserEmpty = new UserClass();
        this.createUser({
          ...UserEmpty,
          ...userToBeSent
        });
      }
      */
    }
     else {
       /*
      this.store.dispatch(new stateActions.LogOut());
      this.store.dispatch(new stateActions.SetUserData(null))
      */
     }
     
  });
/*
  this.store.subscribe(data => {
    if(data[0].isLoggedIn){
      this.appPages[2].title = "Contul meu";
      this.appPages[2].url = '/my-account';
    }
    else {
      this.appPages[2].title = "Autentificati-va sau creati un cont";
      this.appPages[2].url = '/login';
    }
  });
*/

  }

  public createUser(userInfo){
    const usersRef = this.afStore.collection('users').doc(userInfo.uid)

    usersRef.get()
      .subscribe((docSnapshot) => {
        if (docSnapshot.exists) {
          usersRef.update(userInfo);
        } else {
          usersRef.set(userInfo);
        }
    });
  }

  public appPages = pages;

  onDestroy():void{
    this.disconnectSubscription.unsubscribe();
    this.connectSubscription.unsubscribe();
  }

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private store: Store<fromState.AppState>,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private network: Network,
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
