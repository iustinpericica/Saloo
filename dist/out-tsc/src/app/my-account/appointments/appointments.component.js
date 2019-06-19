import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Location } from '@angular/common';
var AppointmentsComponent = /** @class */ (function () {
    function AppointmentsComponent(_location) {
        this._location = _location;
    }
    AppointmentsComponent.prototype.ngOnInit = function () { };
    AppointmentsComponent.prototype.backClicked = function () {
        this._location.back();
    };
    AppointmentsComponent = tslib_1.__decorate([
        Component({
            selector: 'app-appointments',
            templateUrl: './appointments.component.html',
            styleUrls: ['./appointments.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Location])
    ], AppointmentsComponent);
    return AppointmentsComponent;
}());
export { AppointmentsComponent };
//# sourceMappingURL=appointments.component.js.map