import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {

  constructor(private _location: Location, private router: Router) { }

  public eyeType:string = "eye";

  ngOnInit() {}

  backClicked() {
    this._location.back();
  }

  public changeEye():void{
    this.eyeType == 'eye' ? this.eyeType = 'eye-off' : this.eyeType ='eye';
  }

}
