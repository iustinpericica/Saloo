import { Component, OnInit} from '@angular/core';
import { countries } from 'src/app/login/validators/phone.validator';
import {Location} from '@angular/common';
import {map, delay} from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AccountManagementService } from '../accountManagement.service';
import { LoadingController } from '@ionic/angular';

declare let toastr;

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
})
export class PersonalDetailsComponent implements OnInit {

  public loadingController: LoadingController;
  public showController: boolean = false;

  public formControls:User = {
    displayName:'',
    birthday:null,
    location:null,
    email:null,
    title:null,
    firstName:'',
    lastName:'',
    sex:null,
    address:'',
    city:'',
    country:'',
    postalCode:'',
    emailVerified:null,
    phoneNumber:null
  }

  public formControlInitial:User = null;
  public showSave:boolean = false;
  public countries;
  public title:string = "Dl";

  constructor(private _location: Location, private accountManagementService: AccountManagementService,public loadingService: LoadingController) { }



  ngOnInit() {
    
    this.countries = countries.map(val => val[1]);
    this.accountManagementService.getUserInfo().subscribe(data => {
      this.formControls = {
        ...this.formControls,
        ...data
      };

      this.formControlInitial = {
        ...this.formControls
      }
    });
  }

  changeDetect(val, prop):void{ 
      if(this.formControlInitial[prop] != val)this.showSave = true;
      else {
        for(let i in this.formControlInitial)if(this.formControlInitial[i] != this.formControls[i])return;
        this.showSave = false;
      }
      console.log(this.formControlInitial[prop], val);
  }

  backClicked():void{
    this._location.back();
  }

  async save(){
    const loading = await this.loadingService.create({
      message:'Loading..',
      duration: 5000,

    });;

    await loading.present();
    
    this.accountManagementService.saveDetails(this.formControls).then(
      (success) => {
        loading.dismiss();
        toastr.success('Profil salvat cu success!')
      },
      (err) => {
        loading.dismiss();
        toastr.danger(err)
      }
    );
    this.formControlInitial = this.formControls;
    this.showSave = false;
  }

  verifyEmail():void{
    this.accountManagementService.sendEmailVerification();
  }

}
