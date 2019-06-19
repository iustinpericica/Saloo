export var UserActionTypes;
(function (UserActionTypes) {
    UserActionTypes["LogOut"] = "[USER] Log out..";
    UserActionTypes["LogIn"] = "[USER] Log in..";
})(UserActionTypes || (UserActionTypes = {}));
var LogOut = /** @class */ (function () {
    function LogOut() {
        this.type = UserActionTypes.LogOut;
    }
    return LogOut;
}());
export { LogOut };
var LogIn = /** @class */ (function () {
    function LogIn(payload) {
        this.payload = payload;
        this.type = UserActionTypes.LogIn;
        console.log(payload);
        alert("FUTUTI");
    }
    return LogIn;
}());
export { LogIn };
//# sourceMappingURL=user.actions.js.map