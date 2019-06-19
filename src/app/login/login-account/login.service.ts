import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

declare let toastr;

@Injectable()
export class LoginService {
    constructor(private afAuth: AngularFireAuth, private Router: Router){}

    public login(email:string, password:string): Promise<any>{
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
}
}