import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { MainInterfaceAccountComponent } from './main-interface-account/main-interface-account.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { AccountManagementService } from './accountManagement.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ReviewsComponent } from './reviews/reviews.component';


let routes:Route[] = [
  {path:'', component: MainInterfaceAccountComponent},
  {path:'personalDetails', component: PersonalDetailsComponent},
  {path:'appointments', component: AppointmentsComponent}
]

@NgModule({
  declarations: [MainInterfaceAccountComponent, PersonalDetailsComponent, AppointmentsComponent, ReviewsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    IonicModule,
    NgCircleProgressModule.forRoot({
    }),
    AngularFireAuthModule
  ],
  providers:[AccountManagementService]
})
export class MyAccountModule { }
