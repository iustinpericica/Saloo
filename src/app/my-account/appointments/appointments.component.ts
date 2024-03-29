import { Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { AppState, selectUserBasicData } from 'src/app/state';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {

  public segmentSelected:string = 'future';
  public appointments:Array<any>;
  public uid:string;
  public subscribtion: Subscription;
  public authenticated:boolean;

  constructor(private _location: Location, private afStore: AngularFirestore, private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.select(selectUserBasicData).subscribe(data => {
      if(data){
        this.uid = data.uid;
        this.authenticated = true;
      }
      else {
        this.authenticated = false;
        return;
      }
      this.getNextAppointments();
    });

  }

  private getNextAppointments():void{
    let date = new Date();
      let queryData = (date.getMonth() + 1) + '.' + date.getDate() + '.' + date.getFullYear();

      let simbol:any;
      if(this.segmentSelected == 'future')simbol = '>';
      else if(this.segmentSelected == 'past')simbol = '<';
            else simbol = '==';

      console.log(queryData, simbol);
      this.subscribtion = this.afStore.collection('users').doc(this.uid).collection('appointment', ref => ref.where('date', simbol, queryData)).valueChanges().subscribe(data => {
        this.appointments = data;
        console.log(data);
      });
  }

  backClicked():void{
    // CA PE STYLESEET FUCK OFF
    this._location.back();
  }

  segmentChanged(event):void{

    this.segmentSelected = event.detail.value;
    this.getNextAppointments();

  }

  public goToAuthenticatePage():void{
    this.router.navigate(['/login']);
  }

}
