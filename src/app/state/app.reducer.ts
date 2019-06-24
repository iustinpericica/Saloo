import {StateTypes } from './app.actions';

import {RootState, NetworkState} from './index';
import * as actions from './app.actions';
import { createReducer, on } from '@ngrx/store';

/*
export function reducer(state = initialState, action: StateActions){
    switch(action.type){

        case StateTypes.LogOut:
            state.userData.isLoggedIn = false;
            return {
                state
            }

        case StateTypes.LogIn:
                state.userData.isLoggedIn = true;
                return {
                    state
                }

        case StateTypes.SetUserData:
            return{
                ...state,
                userData: action.payload
            }

        default:
            return state;
    }
}
*/

const initialState : RootState = {
    userData: null,
    networkData:{
        lastNetworkConnectionStatus:true,
        networkConnectionStatus:true
    }
}

export const rootReducer = createReducer(
    initialState,
    on(actions.loginAction , (state, {user}) => ({...state, userData: user})),
    on(actions.logoutAction , (state) => ({...state, userData: null})),
    on(actions.networkConnect , (state) => {
        let networkData:NetworkState = {
            lastNetworkConnectionStatus : state.networkData.networkConnectionStatus,
            networkConnectionStatus: true
        
        }
        return {...state, networkData}
    }),
    on(actions.networkDisconnect , (state) => {
        let networkData:NetworkState = {
            lastNetworkConnectionStatus : state.networkData.networkConnectionStatus,
            networkConnectionStatus: false
        
        }
        return {...state, networkData}
    })
)

// Design by Iustin Pericica