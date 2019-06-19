import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
var CreateAccountService = /** @class */ (function () {
    function CreateAccountService(afAuth) {
        this.afAuth = afAuth;
    }
    CreateAccountService.prototype.signIn = function (email, password) {
        this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(function (data) { return console.log(data); }).catch(function (err) { return console.log('err + ' + err); });
    };
    CreateAccountService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [AngularFireAuth])
    ], CreateAccountService);
    return CreateAccountService;
}());
export { CreateAccountService };
//# sourceMappingURL=create-account.service.js.map