import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { AccountManagementService } from '../accountManagement.service';
import { Store } from '@ngrx/store';
import * as fromState from '../state/index';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main-interface-account',
  templateUrl: './main-interface-account.component.html',
  styleUrls: ['./main-interface-account.component.scss'],
})
export class MainInterfaceAccountComponent implements OnInit {

  public percent:number = 0;
  public idCurrentQuestion:number = null;
  public orderToComplete:Array<Questionmodel> = [
    {description:'Adăugaţi numele dummneavoastră', question:'Cum să vă numim?', label: 'displayName'},
    {description: 'Adăugaţi locaţia dummneavoastră', question: 'În ce zonă să căutăm saloane?', label: 'location'},
    {description: 'Verificaţi-vă e-mailul', question:'O măsură in plus de securitate', label: 'email'},
    {description: 'Adăugaţi data de naştere', question: 'Când v-aţi născut?', label : 'birthday'}
  ];


  ngOnInit() {
    this.store.select(fromState.selectGetUserComplexData)
    .subscribe(data => {
      let counterAll = 0, counterFalses = 0;
      let allFalses:Array<string> = new Array<string>();
      for(let i in data){
        counterAll++;
        if(!data[i]){counterFalses++;allFalses.push(i);}
      }
      this.percent = Math.round(((counterAll - counterFalses) * 100)/counterAll);

      let notFound:boolean = true;
      let startLabel = 0;
      while(notFound){
        let id = this.orderToComplete.findIndex(x => x.label == allFalses[startLabel]);
        if(id != -1){
          notFound = false;
          this.idCurrentQuestion = id;
        }
        startLabel++;
        if(startLabel > 3)break;
      }
      if(notFound == true)this.idCurrentQuestion = null;
      console.log(this.idCurrentQuestion);

    })
  }

  constructor(private _location:Location, private router: Router, private accountManagement: AccountManagementService, private store: Store<fromState.State>){}

  backClicked() {
    this._location.back();
  }

  goPersonalDetails():void{
    this.router.navigate(['/my-account/personalDetails']);
  }

  logout():void{
    this.accountManagement.logout();
  }

  public goAppointments():void{
    this.router.navigate(['/my-account/appointments']);
  }

}

export interface Questionmodel{
  description:string;
  question:string;
  label:string;
}