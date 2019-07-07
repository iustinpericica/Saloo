import { GeoPoint } from '@firebase/firestore-types';

export interface SalonInterface{
    position:Geolocation;
    services:Array<string>;
    salonName:string;
    employers:Array<string>;
    city:string;
    street:string;
}

export interface ServiceSubcollectionDocument{

    city:string;
    date:string;
    free:boolean;
    position: Geolocation;
    salonName:string;

} 

export interface Geolocation{
    geohash:string;
    geopoint: GeoPoint;
}

