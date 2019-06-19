import * as tslib_1 from "tslib";
import { UserActionTypes } from './user.actions';
var initialState = {
    user: null
};
export function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case UserActionTypes.LogOut:
            return tslib_1.__assign({}, state, { isLoggedIn: false, user: null });
        case UserActionTypes.LogIn:
            return tslib_1.__assign({}, state, { isLoggedIn: true, user: action.payload });
        default:
            return state;
    }
}
//# sourceMappingURL=user.reducer.js.map