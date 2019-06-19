export var StateTypes;
(function (StateTypes) {
    StateTypes["LogIn"] = "[STATE] Log in";
    StateTypes["LogOut"] = "[STATE] Log Out";
    StateTypes["SetUserData"] = "[USER] Set User Data";
})(StateTypes || (StateTypes = {}));
var LogOut = /** @class */ (function () {
    function LogOut() {
        this.type = StateTypes.LogOut;
    }
    return LogOut;
}());
export { LogOut };
var LogIn = /** @class */ (function () {
    function LogIn() {
        this.type = StateTypes.LogIn;
    }
    return LogIn;
}());
export { LogIn };
var SetUserData = /** @class */ (function () {
    function SetUserData(payload) {
        this.payload = payload;
        this.type = StateTypes.SetUserData;
    }
    return SetUserData;
}());
export { SetUserData };
//# sourceMappingURL=app.actions.js.map