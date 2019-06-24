import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from '../login/models/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import * as fromState from '../state/index';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

declare let toastr;

@Injectable()
export class AccountManagementService{
    
    constructor(private afAuth: AngularFireAuth, private router: Router, private afStore: AngularFirestore, private store: Store<fromState.AppState>){}

    public logout():void{
        this.afAuth.auth.signOut().then(data => {
            this.router.navigate(['/home']);
            console.log('Succes logout')
        }).catch(err => {
            toastr.error("Ceva nu a mers bine..Încearcă puţin mai târziu");
        });
    }

    public saveDetails(user: User):Promise<void>{
        return this.afStore.collection('/users').doc(user.uid).update(user);
    }

    public sendEmailVerification():void{
        this.afAuth.auth.currentUser.sendEmailVerification();
    }

    public getUserInfo():Observable<User>{
        return this.store.pipe(
            map(data => data[0].userData)
          )
    }

}