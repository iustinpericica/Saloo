export interface User{
    
    uid?:string;
    firstName?:string;
    lastName?:string;
    email?:string;
    sex?:string;
    phoneNumber?:string;
    country?:string;
    location?:string;
    provider?:string;
    displayName?:string;
    birthday?:Date;
    title?:string;
    address?:string;
    city?:string;
    postalCode?:string;
    emailVerified?:boolean;
}

export interface UserBasicFirebase{
    displayName?:string;
    phoneNumber?:string;
    provider?:string;
    email?:string;
    uid:string;
}

export class UserBasicFirebaseClass{
    constructor(public uid, public displayName, public phoneNumber, public provider, public email){}
}

export interface UserCreateAccount{
    displayName:string;
    firstName:string;
    lastName:string;
}

export interface UserLoginAccount{
    email:string;
}

export class UserClass{
    uid?:string = null;
    firstName?:string= null;
    lastName?:string= null;
    email?:string= null;
    sex?:string= null;
    phoneNumber?:string= null;
    country?:string= null;
    location?:string= null;
    provider?:string= null;
    displayName?:string= null;
    birthday?:Date= null;
    title?:string= null;
    address?:string= null;
    city?:string= null;
    postalCode?:string= null;
    emailVerified?:boolean= null;
}