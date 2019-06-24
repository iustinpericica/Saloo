
import {Action, State} from '@ngrx/store';
import { User } from '../login/models/user';
import {createAction, props} from '@ngrx/store';

export enum StateTypes{
    LogIn = "[ROOT] Log in",
    LogOut = "[ROOT] Log Out",
    networkConnect = "[ROOT] Network connect",
    networkDisconnect = "[ROOT] Network disconnect",
    watchNetworkConnection = "[ROOT] Watch network connection"
}


export const loginAction = createAction(StateTypes.LogIn, props<{user: User}>());

export const logoutAction = createAction(StateTypes.LogIn, props<{}>());

export const networkConnect = createAction(StateTypes.networkConnect);

export const networkDisconnect = createAction(StateTypes.networkDisconnect);

export const watchNetworkConnection = createAction(StateTypes.watchNetworkConnection);

// Designed By Iustin Pericica