import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { LoadingController } from '@ionic/angular';

declare let toastr;

@Component({
  selector: 'app-login-account',
  templateUrl: './login-account.component.html',
  styleUrls: ['./login-account.component.scss'],
})
export class LoginAccountComponent implements OnInit {

  public eyeType:string = "eye";

  constructor(private _location: Location, private router: Router, private loginService: LoginService, private loadingService: LoadingController) { }

  ngOnInit() {}

  backClicked() {
    this._location.back();
  }

  public changeEye():void{
    this.eyeType == 'eye' ? this.eyeType = 'eye-off' : this.eyeType ='eye';
  }
  async sendValues(form:any){

  const loading = await this.loadingService.create({
    message:'Loading..',
    duration: 5000,

  });;

  await loading.present();

  this.loginService.login(form.email, form.password).then(
        (data) => {
            console.log('Login succes ' + data);
            this.router.navigate(['/home']);
            loading.dismiss();
        }
    ).catch(err => {
        console.error(err);
        loading.dismiss();
        toastr.error("Ceva nu a mers bine..Încearcă puţin mai târziu");
});
      
  }

}
