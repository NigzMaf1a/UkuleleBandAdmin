export type gender = 'Male' | 'Female';
export type accStatus = 'Pending' | 'Approved' | 'Inactive';
export type regType = 'Customer' | 'Accountant' | 'Admin' | 'Supplier';

export default interface User{
    regid:number;
    name:string;
    phoneno:string;
    email:string;
    password:string;
    gender:gender;
    regtype:regType;
    dlocation:string;
    photo:Blob;
    accstatus:accStatus;
}

export interface UserPayload{
    name?:string;
    phoneno?:string;
    Email?:string;
    Password?:string;
    Gender?:string;
    RegType?:string;
    dLocation?:string;
    Photo?:Blob | null;
    accStatus?:string;
}
