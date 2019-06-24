import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { SignInService } from './signIn.service';
import { Platform, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase'
import { AngularFireAuth } from '@angular/fire/auth';

declare let toastr;

@Component({
  selector: 'app-login-main-page',
  templateUrl: './login-main-page.component.html',
  styleUrls: ['./login-main-page.component.scss'],
})
export class LoginMainPageComponent implements OnInit {

  constructor(private _location: Location, private router: Router, private signInService: SignInService, private platform: Platform, private afAuth: AngularFireAuth, private loadingService: LoadingController) { }

  ngOnInit() {}

  backClicked() {
    this._location.back();
  }

  loginAccount():void{
    this.router.navigate(['/login/login-account'])
  }

  createAnAccount(){
    this.router.navigate(['/login/create-account']);
  }

  async signInWithGoogle(){
    if(!this.platform.is('cordova')){
      const loading = await this.loadingService.create({

        message:'Loading..',
        duration: 5000,
    
      });;
    
      await loading.present();
      this.signInService.signInWithGoogleWeb().then(data => {
        console.log('Succes with google ' + data);
        this.router.navigate(['/home']);
        loading.dismiss();
    }
        ).catch(err =>{
            toastr.error("Ceva nu a mers bine..Încearcă puţin mai târziu");
            loading.dismiss();
            console.log(err);
        });;
    }
    else{
      
      this.signInService.signInWithGoogleCordova().then(async (data)=>{
        
        const loading1 = await this.loadingService.create({

          message:'Google a răspuns..',
          duration: 10000,
      
        });;

        await loading1.present();

        const googleCredential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
        return this.afAuth.auth.signInWithCredential(googleCredential).then((user) => {
            console.log('Google user ', user);
            this.router.navigate(['/home']);
            loading1.dismiss();


          }).catch(err =>{
            toastr.error("Ceva nu a mers bine..Încearcă puţin mai târziu");
            loading1.dismiss();
          });
      })
    }
  }

  async signInWithFacebook(){
    if(this.platform.is('cordova')){
        this.signInService.signInWithFacebookCordova().then(async (res) => {
          
          const loading1 = await this.loadingService.create({

            message:'Facebook a răspuns..',
            duration: 10000,
        
          });;
  
          await loading1.present();

          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          return this.afAuth.auth.signInWithCredential(facebookCredential).then((user) => {
              
                loading1.dismiss();
              this.router.navigate(['/home']);
          }).catch(err =>{
              loading1.dismiss();
              toastr.error("Ceva nu a mers bine..Încearcă puţin mai târziu");
              console.log(err);
          });
        })
     
    }
    else{
      const loading = await this.loadingService.create({

        message:'Loading..',
        duration: 5000,
    
      });;
    
      await loading.present();
      this.signInService.signInWithFacebookWeb().then(data => 
        {
            console.log('Succes with google ' + data);
            this.router.navigate(['/home']);
            loading.dismiss();
        }
        ).catch((err) => {
            console.log('Error: ' + err);
            loading.dismiss();
            toastr.error("Ceva nu a mers bine..Încearcă puţin mai târziu");
           
        });
    }
  }

}
