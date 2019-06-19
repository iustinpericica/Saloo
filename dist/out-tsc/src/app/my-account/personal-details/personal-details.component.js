import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { countries } from 'src/app/login/validators/phone.validator';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
var PersonalDetailsComponent = /** @class */ (function () {
    function PersonalDetailsComponent(_location, store) {
        this._location = _location;
        this.store = store;
        this.countryName = "Romania";
        this.title = "Dl";
    }
    PersonalDetailsComponent.prototype.ngOnInit = function () {
        this.countries = countries.map(function (val) { return val[1]; });
        this.store.pipe(map(function (data) { return data[0].userData; })).subscribe(function (data) {
            console.log(data);
        });
    };
    PersonalDetailsComponent.prototype.backClicked = function () {
        this._location.back();
    };
    PersonalDetailsComponent = tslib_1.__decorate([
        Component({
            selector: 'app-personal-details',
            templateUrl: './personal-details.component.html',
            styleUrls: ['./personal-details.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Location, Store])
    ], PersonalDetailsComponent);
    return PersonalDetailsComponent;
}());
export { PersonalDetailsComponent };
//# sourceMappingURL=personal-details.component.js.map