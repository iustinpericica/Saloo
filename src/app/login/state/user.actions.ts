import {User} from '../models/user';

import {Action} from '@ngrx/store';

export enum UserActionTypes{
    LogOut  = '[USER] Log out..',
    LogIn = '[USER] Log in..',
    
}

export class LogOut implements Action{
    readonly type = UserActionTypes.LogOut;
}

export class LogIn implements Action{
    
    readonly type = UserActionTypes.LogIn;
    constructor(public payload:User){
        console.log(payload);alert("FUTUTI")
    }
}



export type UserActions = LogOut|
LogIn;
