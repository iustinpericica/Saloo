
import {Action, State} from '@ngrx/store';
import { User, UserBasicFirebase } from '../models/user';
import {createAction, props} from '@ngrx/store';

export enum StateTypes{
    networkConnect = "[ROOT] Network connect",
    networkDisconnect = "[ROOT] Network disconnect",
    watchNetworkConnection = "[ROOT] Watch network connection",
    getUser = "[ROOT -> USER] Get User",
    getUserDetailedData = "[ROOT -> USER] Get User Complex Data from firestore",
    authenticated = "[ROOT -> USER] User authenticated",
    notAuthenticated = "[ROOT -> USER] User not authenticated",
    authError = "[ROOT -> USER] Auth Error",
    createUserDocumentSuccess = "[ROOT -> USER] Create document success",
    setUserDocumentSuccess = "[ROOT -> USER] Set document success",
    createDocumentUserDetailedDataAction = "[ROOT -> USER] Create document user detailed Data",
    gotUserDetailedDataAction = "[ROOT -> USER] Got user detailed action doc"
}


// export const loginAction = createAction(StateTypes.LogIn, props<{user: User}>());

// export const logoutAction = createAction(StateTypes.LogIn, props<{}>());

export const networkConnect = createAction(StateTypes.networkConnect);

export const networkDisconnect = createAction(StateTypes.networkDisconnect);

export const watchNetworkConnection = createAction(StateTypes.watchNetworkConnection);

export const getUserAction = createAction(StateTypes.getUser);

export const getUserDetailedDataAction = createAction(StateTypes.getUserDetailedData, props<{userBasic:UserBasicFirebase}>());

export const gotUserDetailedDataAction = createAction(StateTypes.gotUserDetailedDataAction, props<{user:User}>());

export const createDocumentUserDetailedDataAction = createAction(StateTypes.createDocumentUserDetailedDataAction, props<{user:User}>());

export const Authenticated = createAction(StateTypes.authenticated, props<{user: UserBasicFirebase}>());

export const NotAuthenticated = createAction(StateTypes.notAuthenticated);

export const setUserDocumentSuccess = createAction(StateTypes.setUserDocumentSuccess)

export const AuthError = createAction(StateTypes.authError);

// Designed By Iustin Pericica