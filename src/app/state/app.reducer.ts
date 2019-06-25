import {StateTypes } from './app.actions';

import {RootState, NetworkState, UserRootState} from './index';
import * as actions from './app.actions';
import { createReducer, on } from '@ngrx/store';

const initialState : RootState = {
    userData: {
        userComplex:null,
        userInfoBasic:null
    },
    networkData:{
        lastNetworkConnectionStatus:true,
        networkConnectionStatus:true
    }
}

export const rootReducer = createReducer(
    initialState,
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
    }),
    on(actions.Authenticated, (state, {user})=>{
        let userData:UserRootState = {
            userComplex: state.userData.userComplex,
            userInfoBasic: user
        };
        return {...state, userData} 
    }),
    on(actions.NotAuthenticated, (state)=>{
        let userData:UserRootState = {
            userComplex: null,
            userInfoBasic: null
        };
        return {...state, userData} 
    }),
    on(actions.gotUserDetailedDataAction, (state, {user})=>{
        let userData:UserRootState = {
            userComplex: user,
            userInfoBasic: state.userData.userInfoBasic
        };
        return {...state, userData} 
    })
)

// Design by Iustin Pericica