import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import * as firebase from 'firebase/app';
import { FirebaseApp } from '@angular/fire';
import * as geofirex from 'geofirex';
import { AngularFirestore } from '@angular/fire/firestore';
import { formatDate } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { SalonInterface } from 'src/app/models/salons';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {

  public dataLoaded:boolean = false;
  public salonsFetched:Array<any> = null;
  public dateSelected:Date = null;
  public searchData:string;
  public appearance = Appearance;
  public selectedLocation:string;
  public lat:number; public lng:number;
  public geo;
  public range:number;
  public query:Subscription;
  constructor(private router: Router, private route: ActivatedRoute, private afStore: AngularFirestore, @Inject(FirebaseApp) firebaseApp: any) {
    

    this.geo = geofirex.init(firebaseApp);
    this.route.queryParams.subscribe(data => {
      if(data.dateChoosen){
        
        let splittedData = data.dateChoosen.split('.');
        let newDate = new Date(+splittedData[2], (+splittedData[0] - 1), +splittedData[1]);
        this.dateSelected = newDate;

      }

      if(data.searchData){
        this.searchData = data.searchData;
      }

      if(data.selectedLocation){
        this.selectedLocation = data.selectedLocation;
      }

      if(data.lat)this.lat = data.lat;
      if(data.lng)this.lng = data.lng;


      if(data.kmRange)this.range = data.kmRange;

      this.updateSearch();
    })
  }

  public updateSearch(){
    if(this.query)this.query.unsubscribe();

    if(this.lat && this.lng){
      // First case if i have the geolocation then split into having date and not having date
        let salons;

        let q1, q2;
        if(this.dateSelected){

          let formatedDate = (this.dateSelected.getMonth() + 1) + '/' + this.dateSelected.getDate() + '/' + this.dateSelected.getFullYear();
          q1 = ref => ref.where('date', '==', formatedDate);
          q2 = ref => ref.where('free', '==', true);

        }

        if(this.dateSelected)salons = this.geo.collection(this.searchData, "subcol", q1, q2);
        else {
          let q1 = ref => ref.where('services', "array-contains", this.searchData);
          salons = this.geo.collection('salons', "collection", q1);
        }


        const center = this.geo.point(this.lat, this.lng);
        let defaultRadius = 10;
        const field = 'position';

        if(this.range)defaultRadius = this.range;


        let queryLocal = salons.within(center, defaultRadius, field);
        this.query = queryLocal.subscribe(data => {
          this.dataLoaded = true;
          this.salonsFetched = data;
          console.log(data)
        });


    }
    else {
        let q1, q2;
        let salons;
        if(this.dateSelected){

          let formatedDate = (this.dateSelected.getMonth() + 1) + '/' + this.dateSelected.getDate() + '/' + this.dateSelected.getFullYear();

          salons = this.afStore.collectionGroup(this.searchData, ref => ref.where('date', '==', formatedDate).where('free', '==', true)).valueChanges();

        }

        else salons = this.afStore.collection('salons', ref => ref.where('services', "array-contains", this.searchData)).valueChanges();

        this.query = salons.subscribe(data => {
          this.dataLoaded = true;
          this.salonsFetched = data;
          for(let point of data){
            console.log(point);
          }
        });

    }
  }

  public goToSalon(salonName){
    this.router.navigate(['/home/salon', salonName]);
  }

  ngOnInit() {
    setTimeout(()=>this.dataLoaded = true, 1000);
  }

  public changeDate(){
    let formattedData = (this.dateSelected.getMonth() + 1) + '.' + this.dateSelected.getDate() + '.' + this.dateSelected.getFullYear();
    return formattedData;
  }


  try(){
    let obiect:any = {};
    if(this.searchData)obiect.searchData = this.searchData;
    if(this.selectedLocation)obiect.selectedLocation = this.selectedLocation;
    if(this.dateSelected)obiect.dateChoosen = this.changeDate();
    if(this.range)obiect.kmRange = this.range;
    if(this.lat)obiect.lat = this.lat;
    if(this.lng)obiect.lng = this.lng;

    this.router.navigate(['.'], { relativeTo: this.route, queryParams: { ...this.route.snapshot.queryParams, ...obiect}});
  }

}
