import * as fromRoot from '../../state/index';
import * as fromUser from './user.reducer';

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../models/user';
import { UserState } from './user.reducer';

export interface State extends fromRoot.State{
    userModule: UserState
}

const getUserFeatureState = createFeatureSelector<fromUser.UserState>('user');

export const getUser = createSelector(
    getUserFeatureState,
    state => state.user
);


