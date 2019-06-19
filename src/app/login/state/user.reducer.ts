import { User } from '../models/user';
import { UserActionTypes, UserActions } from './user.actions';

export interface UserState{
    user:User;
}

const initialState: UserState = {
    user:null
}

export function reducer(state = initialState, action: UserActions){
    switch(action.type){

        case UserActionTypes.LogOut:
            return {
                ...state,
                isLoggedIn:false,
                user:null
            }

        case UserActionTypes.LogIn:
            return {
                ...state,
                isLoggedIn:true,
                user: action.payload
            }

        default:
            return state;
    }
}