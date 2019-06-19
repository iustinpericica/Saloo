import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AccountManagementService } from '../accountManagement.service';
var MainInterfaceAccountComponent = /** @class */ (function () {
    function MainInterfaceAccountComponent(_location, router, accountManagement) {
        this._location = _location;
        this.router = router;
        this.accountManagement = accountManagement;
    }
    MainInterfaceAccountComponent.prototype.ngOnInit = function () { };
    MainInterfaceAccountComponent.prototype.backClicked = function () {
        this._location.back();
    };
    MainInterfaceAccountComponent.prototype.goPersonalDetails = function () {
        this.router.navigate(['/my-account/personalDetails']);
    };
    MainInterfaceAccountComponent.prototype.logout = function () {
        this.accountManagement.logout();
    };
    MainInterfaceAccountComponent.prototype.goAppointments = function () {
        this.router.navigate(['/my-account/appointments']);
    };
    MainInterfaceAccountComponent = tslib_1.__decorate([
        Component({
            selector: 'app-main-interface-account',
            templateUrl: './main-interface-account.component.html',
            styleUrls: ['./main-interface-account.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Location, Router, AccountManagementService])
    ], MainInterfaceAccountComponent);
    return MainInterfaceAccountComponent;
}());
export { MainInterfaceAccountComponent };
//# sourceMappingURL=main-interface-account.component.js.map