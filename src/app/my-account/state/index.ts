import * as fromRoot from '../../state/index';
import { createSelector } from '@ngrx/store';

export interface State extends fromRoot.AppState{

}

export let selectRoot = (state: fromRoot.AppState) => state.root;

export const selectUserData = (state:fromRoot.AppState) => state.root.userData;


export const selectGetUserBasicInfo = createSelector(
    selectUserData,
    (state: fromRoot.UserRootState) => state.userInfoBasic
)

export const selectGetUserComplexData = createSelector(
    selectUserData,
    (state: fromRoot.UserRootState) => state.userComplex
)



