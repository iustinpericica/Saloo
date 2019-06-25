import { User, UserBasicFirebase } from '../models/user';
import { createSelector, State } from '@ngrx/store';

export interface AppState{
    root: RootState
}

export interface RootState{
    userData:UserRootState;
    networkData:NetworkState;

}

export interface NetworkState{
    networkConnectionStatus:boolean;
    lastNetworkConnectionStatus:boolean;
}

export interface UserRootState{
    userInfoBasic: UserBasicFirebase,
    userComplex: User
}

export let selectRoot = (state: AppState) => state.root;

export const selectNetWorkData = (state: AppState) => state.root.networkData;
export const selectUserData = (state:AppState) => state.root.userData;

export const selectNetworkConnection = createSelector(
    selectNetWorkData,
    (state: NetworkState) => state.networkConnectionStatus
);

export const selectLastNetworkConnection = createSelector(
    selectNetWorkData,
    (state: NetworkState) => state.lastNetworkConnectionStatus
);

export const selectUserLoggedIn = createSelector(
    selectUserData,
    (state: UserRootState) => !!state.userInfoBasic
)

export const selectUserComplexData = createSelector(
    selectUserData,
    (state: UserRootState) => state.userComplex
)


// Designed by Iustin Pericica