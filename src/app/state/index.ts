import { User } from '../login/models/user';
import { createSelector, State } from '@ngrx/store';

export interface RootState{
    userData:User;
    networkData:NetworkState

}

export interface NetworkState{
    networkConnectionStatus:boolean;
    lastNetworkConnectionStatus:boolean;
}

export interface AppState{
    root: RootState
}

export let selectRoot = (state: AppState) => state.root;

export const selectNetWorkData = (state: AppState) => state.root.networkData;

export const selectNetworkConnection = createSelector(
    selectNetWorkData,
    (state: NetworkState) => state.networkConnectionStatus
);

export const selectLastNetworkConnection = createSelector(
    selectNetWorkData,
    (state: NetworkState) => state.lastNetworkConnectionStatus
);



// Designed by Iustin Pericica