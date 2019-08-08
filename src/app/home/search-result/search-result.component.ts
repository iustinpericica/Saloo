import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import { FirebaseApp } from '@angular/fire';
import * as geofirex from 'geofirex';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';


declare const google: any;

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
  public queryData:string;
  public geo;
  public range:number;
  public query:Subscription;
  public showMap:boolean = false;
  public zoom:number = 10;
  public showSearchHereButton:boolean = false;
  public map;
  public salonSelected:string = null;
  public currentLat:number;
  public currentLng:number;
  public queryStatus:number; // 1 = sending, 2 = received, 3 = error;
  

  public book(salonName:string){
    let obiect:any = {
      service: this.searchData
    }
    if(this.dateSelected)obiect.date = this.queryData;
    this.router.navigate(['/home/appointment', salonName], {
      queryParams:obiect
    })
  }

  constructor(private router: Router, private route: ActivatedRoute, private afStore: AngularFirestore, @Inject(FirebaseApp) firebaseApp: any) {

    this.geo = geofirex.init(firebaseApp);
    this.route.queryParams.subscribe(data => {
      if(data.dateChoosen){
        
        this.queryData = data.dateChoosen;
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

      if(data.lat)this.lat = +data.lat;
      if(data.lng)this.lng = +data.lng;


      if(data.kmRange)this.range = data.kmRange;

      this.updateSearch();
    })

  }

  public updateSearch(){
    if(this.query)this.query.unsubscribe();
    this.queryStatus = 1;
    if(this.lat && this.lng){
      // First case if i have the geolocation then split into having date and not having date
        let salons;

        let q1, q2;
        if(this.dateSelected){

          let formatedDate = (this.dateSelected.getMonth() + 1) + '/' + this.dateSelected.getDate() + '/' + this.dateSelected.getFullYear();
          q1 = ref => ref.where('date', '==', formatedDate);
          q2 = ref => ref.where('free', '==', true);

        }
        if(this.searchData){
          if(this.dateSelected)salons = this.geo.collection(this.searchData, "subcol", q1, q2);
          else {
            let q1 = ref => ref.where('services', "array-contains", this.searchData);
            salons = this.geo.collection('salons', "collection", q1);
          }
        }
        else {
          alert("got to pick a service");
        }

        let lat = this.currentLat ? this.currentLat : this.lat;
        let lng = this.currentLng ? this.currentLng : this.lng;
        const center = this.geo.point(lat, lng);
        let defaultRadius = 10;
        const field = 'position';

        if(this.range)defaultRadius = this.range;

        console.log(this.searchData + ' ' + lat + ' ' + lng);
        
        let queryLocal = salons.within(center, defaultRadius, field);
        this.query = queryLocal.pipe(
          catchError(data => {
            this.queryStatus = 3;
            return data;
          })
        ). subscribe(data => {
          console.log(data);
          if(!data)this.queryStatus = 3;
          else this.queryStatus = 2;
          this.dataLoaded = true;
          this.salonsFetched = data;
          
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

        this.query = salons.pipe(
          catchError(data => {
            this.queryStatus = 3;
            return data;
          })
        ). subscribe(data => {
          console.log(data);
          if(!data)this.queryStatus = 3;
          else this.queryStatus = 2;
          this.dataLoaded = true;
          this.salonsFetched = data;
          
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
    if(this.lat)obiect.lat = this.currentLat ? this.currentLat : this.lat;
    if(this.lng)obiect.lng =  this.currentLng ? this.currentLng : this.lng;
    if(this.range)obiect.range = this.range;

    this.router.navigate(['.'], { relativeTo: this.route, queryParams: { ...this.route.snapshot.queryParams, ...obiect}});
  }

  public zoomChange(zoom:number){
    this.zoom = zoom;
  }

  public centerChange(centerChanged){

    if(!this.showSearchHereButton){
      this.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(document.getElementById('searchHere'));
      this.showSearchHereButton = true;
    }

    this.currentLat = centerChanged.lat;
    this.currentLng = centerChanged.lng;

  }

  mapReady(event: any) {
    this.currentLat = this.lat;
    this.currentLng = this.lng;
    this.map = event;

    
}
  public boundsChange(bounds){
    let cornerLat = bounds.na.j;
    let cornerLng = bounds.ia.j;
    let centerLat = this.currentLat;
    let centerLng = this.currentLng;
    let center = this.geo.point(cornerLat, cornerLng);
    let distanceKm = center.distance(centerLat, centerLng);
    this.range = distanceKm;
  }

}
