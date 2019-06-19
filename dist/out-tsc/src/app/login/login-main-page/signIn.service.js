import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import * as firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
var SignInService = /** @class */ (function () {
    function SignInService(afAuth, platform, googlePlus, fb, afFire) {
        this.afAuth = afAuth;
        this.platform = platform;
        this.googlePlus = googlePlus;
        this.fb = fb;
        this.afFire = afFire;
        console.dir(platform);
    }
    SignInService.prototype.signInWithGoogleCordova = function () {
        var _this = this;
        this.googlePlus.login({
            'webClientId': '37110219035-cqneddk2j54njr1tl75pkva12bttpo79.apps.googleusercontent.com'
        }).then(function (data) {
            console.log("Google ", data);
            var googleCredential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
            return _this.afAuth.auth.signInWithCredential(googleCredential).then(function (user) {
                console.log('Google user ', user);
            });
        });
    };
    SignInService.prototype.signInWithFacebookCordova = function () {
        var _this = this;
        this.fb.login(['email', 'public_profile']).then(function (res) {
            console.log("facebook", res);
            var facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
            return _this.afAuth.auth.signInWithCredential(facebookCredential).then(function (user) {
                console.log('Facebook user ', user);
            });
        });
    };
    SignInService.prototype.signInWithGoogle = function () {
        if (this.platform.is('cordova')) {
            this.signInWithGoogleCordova();
        }
        else {
            this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(function (data) { return console.log('Succes with google ' + data); }).catch(function (err) { return console.log('Error: ' + err); });
        }
    };
    SignInService.prototype.signInWithFacebook = function () {
        if (this.platform.is('cordova')) {
            this.signInWithFacebookCordova();
        }
        else {
            this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()).then(function (data) { return console.log('Succes with google ' + data); }).catch(function (err) { return console.log('Error: ' + err); });
        }
    };
    SignInService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [AngularFireAuth, Platform, GooglePlus, Facebook,
            AngularFirestore])
    ], SignInService);
    return SignInService;
}());
export { SignInService };
//# sourceMappingURL=signIn.service.js.map