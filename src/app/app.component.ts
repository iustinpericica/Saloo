import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Store } from '@ngrx/store';
import * as fromState from './state/index'
import * as stateActions from './state/app.actions';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { User, UserClass } from './login/models/user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{

  public ngOnInit():void{
    //this.store.dispatch(new stateActions.LogIn());
    this.afAuth.user.subscribe((user) => {
      /*
      if(!user)this.store.dispatch(new stateActions.LogOut());
      else this.store.dispatch(new stateActions.LogIn(user))
      */
     if(user){
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
    }
     else {
      this.store.dispatch(new stateActions.LogOut());
      this.store.dispatch(new stateActions.SetUserData(null))
     }
     
  });

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

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title:'',
      url:'',
      icon:'contact'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private store: Store<fromState.State>,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
