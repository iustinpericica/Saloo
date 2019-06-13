import { NgModule } from "@angular/core";
import { LoginMainPageComponent } from './login-main-page/login-main-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginAccountComponent } from './login-account/login-account.component';

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
        RouterModule.forChild(routes)
    ]
})
export class UserLoginModule{}