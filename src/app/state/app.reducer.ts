import { StateActions, StateTypes } from './app.actions';

import {State} from './index';

const initialState: State = {
    isLoggedIn:false,
    userData:null
}

export function reducer(state = initialState, action: StateActions){
    switch(action.type){

        case StateTypes.LogOut:
            return {
                ...state,
                isLoggedIn: false
            }

        case StateTypes.LogIn:
            return {
                ...state,
                isLoggedIn: true
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