import { NgModule } from "@angular/core";
import { LoginMainPageComponent } from './login-main-page/login-main-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginAccountComponent } from './login-account/login-account.component';
import { StoreModule } from '@ngrx/store';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CreateAccountService } from './create-account/create-account.service';
import { LoginService } from './login-account/login.service';
import { SignInService } from './login-main-page/signIn.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { loginReducer } from './state/user.reducer';

let routes:Routes = [
    {path:'', component: LoginMainPageComponent},
    {path:'create-account', component: CreateAccountComponent},
    {path:'login-account', component: LoginAccountComponent}
]

@NgModule({
    declarations:[LoginMainPageComponent, CreateAccountComponent, LoginAccountComponent],
    imports:[
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        StoreModule.forFeature('login', loginReducer),
        AngularFireAuthModule,
        AngularFirestoreModule
        
    ]
    ,providers:[CreateAccountService, GooglePlus, Facebook, LoginService, SignInService]
})
export class UserLoginModule{}