import { Component, OnInit } from '@angular/core';
import * as fromActions from '../state/app.actions';
import * as fromState from '../state/index';
import { Store } from '@ngrx/store';
import { User } from '../models/user';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public userData:User = null;
  public isLoggedIn:boolean = false;
  public searchData:string;
  public currentSelectedPlace:string = null;
  public currentSelectedGeolocation:any= new Object();
  public dateChoosen: string;
  public kmRange:number;
  public test;
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();
  
  constructor(private store: Store<fromState.AppState>, private router: Router, private afStore: AngularFirestore) {}

  public appearance = Appearance;
  public zoom: number;
  public latitude: number = null;
  public longitude: number;
  public selectedAddress: PlaceResult;
  public showMap: boolean = false;
  public location:string = null;


  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  
  minDate = new Date();

  images = [
    {image: 'http://www.secretmountain.co.uk/wp-content/gallery/tgo-challenge-selection/120515_1040829_01_master_ipad.jpg'},
    {image: 'https://microsites.lomography.com/lc-wide/content/galleries/square-format/square-format.08.jpg'}
  ]

  public filteredGroups = [
    {
      options:[1, 2, 3],
      name : "A"
    },
    {
      options:[5, 7, 8],
      name : "B"
    }
  ];

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  public ngOnInit():void{

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.zoom = 10;
    //this.setCurrentPosition();


    this.store.select(fromState.selectUserComplexData).subscribe(data => {
      this.userData = data;
    });
    this.store.select(fromState.selectUserLoggedIn).subscribe(data => {
      this.isLoggedIn = data;
    });

    this.afStore.collection('dataToBeQueried').doc('searchInput').valueChanges().subscribe((data:any) => {

      
      for(let salon of data.salons){
        this.options.push('Salon: ' + salon);
      }



      for(let service of data.services){
        this.options.push('Serviciu: ' + service);
      }



      for(let worker of data.workers){
        this.options.push('Stilist: ' + worker);
      }

    })

  }

  public changeDate(event){
    this.dateChoosen = (event.getMonth() + 1) + '.' + event.getDate() + '.' + event.getFullYear();
    console.log(this.dateChoosen);
  }


  onAutocompleteSelected(event){
    console.log(event);
    this.currentSelectedPlace = event.formatted_address;
    console.log(this.currentSelectedPlace);

  }

  onLocationSelected(location: Location) {
    console.log(location);
    this.currentSelectedGeolocation.lat = location.latitude;
    this.currentSelectedGeolocation.lng  = location.longitude;
    console.log(this.currentSelectedGeolocation);
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        this.currentSelectedGeolocation.lat = position.coords.latitude;
        this.currentSelectedGeolocation.lng = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  public search():void{
    console.log(this.searchData, this.currentSelectedPlace, this.dateChoosen, this.kmRange);
    let obiect:any = {};
    if(this.searchData)obiect.searchData = this.searchData;
    else {
      alert("got to pick a service");
      return;
    }
    if(this.currentSelectedPlace)obiect.selectedLocation = this.currentSelectedPlace;
    if(this.dateChoosen)obiect.dateChoosen = this.dateChoosen;
    if(this.kmRange)obiect.kmRange = this.kmRange;
    if(this.currentSelectedGeolocation.lat)obiect.lat = this.currentSelectedGeolocation.lat;
    if(this.currentSelectedGeolocation.lng)obiect.lng = this.currentSelectedGeolocation.lng;
    if(this.kmRange)obiect.range = this.kmRange;

    this.router.navigate(['/home/search'], {queryParams: obiect});
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  public clickedSearchOption(option:string){

    let split1 = option.split(':')[0];
    console.log(split1);
    if(split1 == 'Salon')this.router.navigate([`/home/salon/${option.split(':')[1].trim()}`]);
    // mai trebuie facut pentru stilit
    return;


  }

}
