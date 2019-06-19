import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
var AccountManagementService = /** @class */ (function () {
    function AccountManagementService(afAuth, router) {
        this.afAuth = afAuth;
        this.router = router;
    }
    AccountManagementService.prototype.logout = function () {
        var _this = this;
        this.afAuth.auth.signOut().then(function (data) {
            _this.router.navigate(['/home']);
            console.log('Succes logout');
        });
    };
    AccountManagementService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [AngularFireAuth, Router])
    ], AccountManagementService);
    return AccountManagementService;
}());
export { AccountManagementService };
//# sourceMappingURL=accountManagement.service.js.map