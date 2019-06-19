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

    

    private signInWithGoogleCordova():void{
        this.googlePlus.login({
            'webClientId': '37110219035-cqneddk2j54njr1tl75pkva12bttpo79.apps.googleusercontent.com'
          }).then((data)=>{
            console.log("Google ", data);
            const googleCredential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
            return this.afAuth.auth.signInWithCredential(googleCredential).then((user) => {
                console.log('Google user ', user);
                this.router.navigate(['/home']);

  
              }).catch(err =>{
                toastr.error("Ceva nu a mers bine..Încearcă puţin mai târziu");
              });
          })
    }

    public signInWithFacebookCordova():void{
     this.fb.login(['email', 'public_profile']).then(res => {
            console.log("facebook", res);
            const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
            return this.afAuth.auth.signInWithCredential(facebookCredential).then((user) => {
                console.log('Facebook user ', user);
                this.router.navigate(['/home']);
            }).catch(err =>{
                toastr.error("Ceva nu a mers bine..Încearcă puţin mai târziu");
                console.log(err);
            });
          })
    }




    public signInWithGoogle():void{
        if(this.platform.is('cordova')){
            this.signInWithGoogleCordova();
        }
        else {
        this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(data => {
            console.log('Succes with google ' + data);
            this.router.navigate(['/home']);
        }
            ).catch(err =>{
                toastr.error("Ceva nu a mers bine..Încearcă puţin mai târziu");
                console.log(err);
            });
        }
    }

    public signInWithFacebook():void{
        if(this.platform.is('cordova')){
            this.signInWithFacebookCordova();
        }
        else {

        this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()).then(data => 
            {
                console.log('Succes with google ' + data)
                this.router.navigate(['/home']);
            }
            ).catch((err) => {
                console.log('Error: ' + err);
                toastr.error("Ceva nu a mers bine..Încearcă puţin mai târziu");
               
            });

        }
    }

}