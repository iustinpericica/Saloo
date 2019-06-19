import { Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {}

  backClicked():void{
    this._location.back();
  }

}
