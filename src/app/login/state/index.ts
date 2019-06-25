import * as fromRoot from '../../state/index';


import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserLoginAccount, UserCreateAccount } from '../../models/user';


export interface State extends fromRoot.AppState{
    login: LoginState;
}

export interface LoginState{
    createAccountInformation:UserCreateAccount;
    loginAccountInformation:UserLoginAccount;
}

const getLoginFeatureState = createFeatureSelector<LoginState>('login');

export const getCreateAccountInformation = createSelector(
    getLoginFeatureState,
    state => state.createAccountInformation
);

export const getLoginAccountInformation = createSelector(
    getLoginFeatureState,
    state => state.loginAccountInformation
);


