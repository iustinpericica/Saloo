import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PhoneValidator } from '../validators/phone.validator';
import { CountryPhone } from './country-phone.model';
import { PasswordValidator } from '../validators/password.validator';
import { UsernameValidator } from '../validators/username.validator';
import { countries } from '../validators/phone.validator';
import { CreateAccountService } from './create-account.service';
var CreateAccountComponent = /** @class */ (function () {
    function CreateAccountComponent(_location, router, formBuilder, createAccountService) {
        this._location = _location;
        this.router = router;
        this.formBuilder = formBuilder;
        this.createAccountService = createAccountService;
        this.eyeType = "eye";
        this.validation_messages = {
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
    }
    CreateAccountComponent.prototype.ngOnInit = function () {
        //  We just use a few random countries, however, you can use the countries you need by just adding them to this list.
        // also you can use a library to get all the countries from the world.
        this.countries = countries.map(function (value) {
            return new CountryPhone(value[0], value[1]);
        });
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
        }, function (formGroup) {
            return PasswordValidator.areEqual(formGroup);
        });
        var country = new FormControl(this.countries[168], Validators.required);
        var phone = new FormControl('+40', Validators.compose([
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
    };
    CreateAccountComponent.prototype.onSubmit = function (values) {
        console.log(values);
        this.createAccountService.signIn(values.email, values.matching_passwords.password);
        //this.router.navigate(["/user"]);
    };
    CreateAccountComponent.prototype.backClicked = function () {
        this._location.back();
    };
    CreateAccountComponent.prototype.changeEye = function () {
        this.eyeType == 'eye' ? this.eyeType = 'eye-off' : this.eyeType = 'eye';
    };
    CreateAccountComponent = tslib_1.__decorate([
        Component({
            selector: 'app-create-account',
            templateUrl: './create-account.component.html',
            styleUrls: ['./create-account.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Location, Router, FormBuilder, CreateAccountService])
    ], CreateAccountComponent);
    return CreateAccountComponent;
}());
export { CreateAccountComponent };
//# sourceMappingURL=create-account.component.js.map