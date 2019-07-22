import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { AngularMaterialModule } from '../shared/angularMaterial.module';
import { AgmCoreModule } from '@agm/core'; 
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { environment } from 'src/environments/environment';
import { HighlightPipe } from './highlight.pipe';
import { SearchResultComponent } from './search-result/search-result.component';
import { RatingModule } from 'ng-starrating';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { GestureConfig } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SalonComponent } from './salon/salon.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';
import { AngularFireFunctions } from '@angular/fire/functions';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        pathMatch:'full'
      },
      {
        path:'search', component: SearchResultComponent
      },
      {
        path:'salon/:salonName', component: SalonComponent
      },
      {
        path:'appointment/:salonName', component:MakeAppointmentComponent
      }
    ]),
    AngularMaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC6RRJ101LFFnUtzvp0PNWBXzErXofEO-Y',
      libraries: ['places'],
      language: 'ro'
    }),
    MatGoogleMapsAutocompleteModule.forRoot(),
    ReactiveFormsModule,
    RatingModule,
    NgxGalleryModule
  ],
  declarations: [HomePage, HighlightPipe, SearchResultComponent, SalonComponent, MakeAppointmentComponent],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    AngularFireFunctions
  ]
})
export class HomePageModule {}
