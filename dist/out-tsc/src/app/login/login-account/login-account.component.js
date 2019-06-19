import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
var LoginAccountComponent = /** @class */ (function () {
    function LoginAccountComponent(_location, router, loginService) {
        this._location = _location;
        this.router = router;
        this.loginService = loginService;
        this.eyeType = "eye";
    }
    LoginAccountComponent.prototype.ngOnInit = function () { };
    LoginAccountComponent.prototype.backClicked = function () {
        this._location.back();
    };
    LoginAccountComponent.prototype.changeEye = function () {
        this.eyeType == 'eye' ? this.eyeType = 'eye-off' : this.eyeType = 'eye';
    };
    LoginAccountComponent.prototype.sendValues = function (form) {
        this.loginService.login(form.email, form.password);
    };
    LoginAccountComponent = tslib_1.__decorate([
        Component({
            selector: 'app-login-account',
            templateUrl: './login-account.component.html',
            styleUrls: ['./login-account.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Location, Router, LoginService])
    ], LoginAccountComponent);
    return LoginAccountComponent;
}());
export { LoginAccountComponent };
//# sourceMappingURL=login-account.component.js.map