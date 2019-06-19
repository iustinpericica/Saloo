import { createFeatureSelector, createSelector } from '@ngrx/store';
var getUserFeatureState = createFeatureSelector('user');
export var getUser = createSelector(getUserFeatureState, function (state) { return state.user; });
//# sourceMappingURL=index.js.map