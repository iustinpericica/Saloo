import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.scss'],
})
export class SalonComponent implements OnInit {

  public salonName:string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.salonName = this.activatedRoute.snapshot.params.salonName;
  }

}
