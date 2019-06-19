
import {Action, State} from '@ngrx/store';
import { User } from '../login/models/user';


export enum StateTypes{
    LogIn = "[STATE] Log in",
    LogOut = "[STATE] Log Out",
    SetUserData = "[USER] Set User Data"
}

export class LogOut implements Action{
    readonly type = StateTypes.LogOut;
}

export class LogIn implements Action{
    readonly type = StateTypes.LogIn;
}

export class SetUserData implements Action{
    readonly type = StateTypes.SetUserData;
    constructor(public payload:User){}
}

export type StateActions = LogOut|
LogIn|
SetUserData;
