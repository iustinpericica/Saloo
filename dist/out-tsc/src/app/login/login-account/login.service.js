import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
var LoginService = /** @class */ (function () {
    function LoginService(afAuth, Router) {
        this.afAuth = afAuth;
        this.Router = Router;
    }
    LoginService.prototype.login = function (email, password) {
        var _this = this;
        this.afAuth.auth.signInWithEmailAndPassword(email, password).then(function (data) {
            console.log('Login succes ' + data);
            _this.Router.navigate(['/home']);
        }).catch(function (err) { return console.error(err); });
    };
    LoginService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [AngularFireAuth, Router])
    ], LoginService);
    return LoginService;
}());
export { LoginService };
//# sourceMappingURL=login.service.js.map