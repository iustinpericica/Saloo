import {User, UserCreateAccount, UserLoginAccount} from '../../models/user';

import {Action, createAction, props} from '@ngrx/store';

export enum UserActionTypes{
    loginAccountInformation  = '[LOGIN] User login information..',
    createAccountInformation = '[LOGIN] User create account information..',
    
}

export const createAccountInformationAction = createAction(UserActionTypes.createAccountInformation, props<{info: UserCreateAccount}>());

export const loginAccountInformationAction = createAction(UserActionTypes.loginAccountInformation, props<{info: UserLoginAccount}>());

