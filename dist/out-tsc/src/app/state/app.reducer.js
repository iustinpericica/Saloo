import * as tslib_1 from "tslib";
import { StateTypes } from './app.actions';
var initialState = {
    isLoggedIn: false,
    userData: null
};
export function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case StateTypes.LogOut:
            return tslib_1.__assign({}, state, { isLoggedIn: false });
        case StateTypes.LogIn:
            return tslib_1.__assign({}, state, { isLoggedIn: true });
        case StateTypes.SetUserData:
            return tslib_1.__assign({}, state, { userData: action.payload });
        default:
            return state;
    }
}
//# sourceMappingURL=app.reducer.js.map