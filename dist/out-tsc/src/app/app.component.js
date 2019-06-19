import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Store } from '@ngrx/store';
import * as stateActions from './state/app.actions';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, splashScreen, statusBar, store, afAuth, afStore) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.store = store;
        this.afAuth = afAuth;
        this.afStore = afStore;
        this.appPages = [
            {
                title: 'Home',
                url: '/home',
                icon: 'home'
            },
            {
                title: 'List',
                url: '/list',
                icon: 'list'
            },
            {
                title: '',
                url: '',
                icon: 'contact'
            }
        ];
        this.initializeApp();
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        //this.store.dispatch(new stateActions.LogIn());
        this.afAuth.user.subscribe(function (user) {
            /*
            if(!user)this.store.dispatch(new stateActions.LogOut());
            else this.store.dispatch(new stateActions.LogIn(user))
            */
            if (user) {
                _this.store.dispatch(new stateActions.LogIn());
                _this.afStore.collection('/users').doc(user.uid).valueChanges().subscribe(function (data) {
                    _this.store.dispatch(new stateActions.SetUserData(data));
                });
                _this.createUserFacebookAndGoogle({
                    uid: user.uid,
                    email: user.email
                });
            }
            else {
                _this.store.dispatch(new stateActions.LogOut());
                _this.store.dispatch(new stateActions.SetUserData(null));
            }
        });
        this.store.subscribe(function (data) {
            if (data[0].isLoggedIn) {
                _this.appPages[2].title = "Contul meu";
                _this.appPages[2].url = '/my-account';
            }
            else {
                _this.appPages[2].title = "Autentificati-va sau creati un cont";
                _this.appPages[2].url = '/login';
            }
        });
    };
    AppComponent.prototype.createUserFacebookAndGoogle = function (userInfo) {
        var usersRef = this.afStore.collection('users').doc(userInfo.uid);
        usersRef.get()
            .subscribe(function (docSnapshot) {
            if (docSnapshot.exists) {
                console.dir(docSnapshot);
            }
            else {
                usersRef.set(userInfo);
            }
        });
    };
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [Platform,
            SplashScreen,
            StatusBar,
            Store,
            AngularFireAuth,
            AngularFirestore])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map