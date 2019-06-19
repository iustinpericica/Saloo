import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

declare let toastr;

@Injectable()
export class CreateAccountService{

    constructor(private afAuth: AngularFireAuth, private router: Router){}

    signIn(email:string , password:string): Promise<any>{
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    }

}