import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { LoginMainPageComponent } from './login-main-page/login-main-page.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginAccountComponent } from './login-account/login-account.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/user.reducer';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CreateAccountService } from './create-account/create-account.service';
import { LoginService } from './login-account/login.service';
import { SignInService } from './login-main-page/signIn.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { AngularFirestoreModule } from '@angular/fire/firestore';
var routes = [
    { path: '', component: LoginMainPageComponent },
    { path: 'create-account', component: CreateAccountComponent },
    { path: 'login-account', component: LoginAccountComponent }
];
var UserLoginModule = /** @class */ (function () {
    function UserLoginModule() {
    }
    UserLoginModule = tslib_1.__decorate([
        NgModule({
            declarations: [LoginMainPageComponent, CreateAccountComponent, LoginAccountComponent],
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                ReactiveFormsModule,
                StoreModule.forFeature('user', reducer),
                AngularFireAuthModule,
                AngularFirestoreModule
            ],
            providers: [CreateAccountService, GooglePlus, Facebook, LoginService, SignInService]
        })
    ], UserLoginModule);
    return UserLoginModule;
}());
export { UserLoginModule };
//# sourceMappingURL=login.module.js.map