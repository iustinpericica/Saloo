import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SignInService } from './signIn.service';
var LoginMainPageComponent = /** @class */ (function () {
    function LoginMainPageComponent(_location, router, signInService) {
        this._location = _location;
        this.router = router;
        this.signInService = signInService;
    }
    LoginMainPageComponent.prototype.ngOnInit = function () { };
    LoginMainPageComponent.prototype.backClicked = function () {
        this._location.back();
    };
    LoginMainPageComponent.prototype.loginAccount = function () {
        this.router.navigate(['/login/login-account']);
    };
    LoginMainPageComponent.prototype.createAnAccount = function () {
        this.router.navigate(['/login/create-account']);
    };
    LoginMainPageComponent.prototype.signInWithGoogle = function () {
        this.signInService.signInWithGoogle();
    };
    LoginMainPageComponent.prototype.signInWithFacebook = function () {
        this.signInService.signInWithFacebook();
    };
    LoginMainPageComponent = tslib_1.__decorate([
        Component({
            selector: 'app-login-main-page',
            templateUrl: './login-main-page.component.html',
            styleUrls: ['./login-main-page.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Location, Router, SignInService])
    ], LoginMainPageComponent);
    return LoginMainPageComponent;
}());
export { LoginMainPageComponent };
//# sourceMappingURL=login-main-page.component.js.map