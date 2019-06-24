import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PhoneValidator } from '../validators/phone.validator';
import { CountryPhone } from './country-phone.model';
import { PasswordValidator } from '../validators/password.validator';
import { UsernameValidator } from '../validators/username.validator';
import {countries} from '../validators/phone.validator';
import { CreateAccountService } from './create-account.service';
import { LoadingController } from '@ionic/angular';

declare let toastr;

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {

  validations_form: FormGroup;
  genders: Array<string>;
  matching_passwords_group: FormGroup;
  country_phone_group: FormGroup;

  countries: Array<CountryPhone>;


  constructor(private _location: Location, private router: Router, public formBuilder: FormBuilder, private createAccountService: CreateAccountService,private loadingService: LoadingController) { }

  public eyeType:string = "eye";

  ngOnInit() {


    //  We just use a few random countries, however, you can use the countries you need by just adding them to this list.
    // also you can use a library to get all the countries from the world.

    this.countries = countries.map(value => {
      return new CountryPhone(value[0], value[1]);
    })

    this.genders = [
      "Male",
      "Female"
    ];

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    let country = new FormControl(this.countries[168], Validators.required);
    let phone = new FormControl('+40', Validators.compose([
      Validators.required,
      PhoneValidator.validCountryPhone(country)
    ]));
    this.country_phone_group = new FormGroup({
      country: country,
      phone: phone
    });

    this.validations_form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      gender: new FormControl('', Validators.required),
      country_phone: this.country_phone_group,
      matching_passwords: this.matching_passwords_group
    });
    
  }

  validation_messages = {
    'username': [
      { type: 'required', message: 'Numele de utilizator este necesar' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'lastname': [
      { type: 'required', message: 'Last name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please wnter a valid email.' }
    ],
    'phone': [
      { type: 'required', message: 'Phone is required.' },
      { type: 'validCountryPhone', message: 'The phone is incorrect for the selected country.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch.' }
    ],
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions.' }
    ],
  };

  async onSubmit(values){
    const loading = await this.loadingService.create({
      message:'Loading..',
      duration: 5000,

    });;

    await loading.present();

    this.createAccountService.signIn(values.email, values.matching_passwords.password).then(          
      (data) => {
          loading.dismiss();
          this.router.navigate(['/home']);   
              }
      ).catch(err => {
          loading.dismiss();  
          toastr.error("Ceva nu a mers bine..Încearcă puţin mai târziu");
  });
  }

  backClicked() {
    this._location.back();
  }


  public changeEye():void{
    this.eyeType == 'eye' ? this.eyeType = 'eye-off' : this.eyeType ='eye';
  }

}
