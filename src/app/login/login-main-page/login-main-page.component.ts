import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-main-page',
  templateUrl: './login-main-page.component.html',
  styleUrls: ['./login-main-page.component.scss'],
})
export class LoginMainPageComponent implements OnInit {

  constructor(private _location: Location, private router: Router) { }

  ngOnInit() {}

  backClicked() {
    this._location.back();
  }

  createAnAccount(){
    this.router.navigate(['/login/create-account']);
  }

}
