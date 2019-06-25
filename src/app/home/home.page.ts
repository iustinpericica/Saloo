import { Component, OnInit } from '@angular/core';
import * as fromActions from '../state/app.actions';
import * as fromState from '../state/index';
import { Store } from '@ngrx/store';
import { User } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public userData:User = null;
  public isLoggedIn:boolean = false;
  constructor(private store: Store<fromState.AppState>) {}



  public ngOnInit():void{
    this.store.select(fromState.selectUserComplexData).subscribe(data => {
      this.userData = data;
    });
    this.store.select(fromState.selectUserLoggedIn).subscribe(data => {
      this.isLoggedIn = data;
    });
  }

}
