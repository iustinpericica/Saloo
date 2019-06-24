import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import * as firebase from 'firebase'
import { Facebook } from '@ionic-native/facebook/ngx';
import {AngularFirestore} from '@angular/fire/firestore';
import { Router } from '@angular/router';

declare let toastr;

@Injectable()
export class SignInService{

    constructor(private afAuth: AngularFireAuth, private platform: Platform, private googlePlus: GooglePlus, private fb: Facebook,
        private afFire: AngularFirestore, private router: Router){
        console.dir(platform);
    }

    

    public signInWithGoogleCordova():Promise<any>{
        return this.googlePlus.login({
            'webClientId': '37110219035-cqneddk2j54njr1tl75pkva12bttpo79.apps.googleusercontent.com'
          });
    }

    public signInWithFacebookCordova():Promise<any>{
     return this.fb.login(['email', 'public_profile']);
    }




    public signInWithGoogleWeb():Promise<any>{

        return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());;
    }
    
    public signInWithFacebookWeb():Promise<any>{

        return this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
    
    }

}