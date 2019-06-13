import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-account',
  templateUrl: './login-account.component.html',
  styleUrls: ['./login-account.component.scss'],
})
export class LoginAccountComponent implements OnInit {

  public eyeType:string = "eye";

  constructor(private _location: Location, private router: Router) { }

  ngOnInit() {}

  backClicked() {
    this._location.back();
  }

  public changeEye():void{
    this.eyeType == 'eye' ? this.eyeType = 'eye-off' : this.eyeType ='eye';
  }

}
