import * as actions from './user.actions';
import {LoginState} from './index';
import { createReducer, on} from '@ngrx/store';

const initialState: LoginState = {
    createAccountInformation:null,
    loginAccountInformation:null
}


export const loginReducer = createReducer(
    initialState,
    on(actions.loginAccountInformationAction , (state, {info}) => ({...state, loginAccountInformation: info})),
    on(actions.createAccountInformationAction , (state, {info}) => ({...state, createAccountInformation: info}))
)

// Designed by I.P