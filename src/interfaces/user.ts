export type gender = 'Male' | 'Female';
export type accStatus = 'Pending' | 'Approved' | 'Inactive';
export type regType = 'Customer' | 'Accountant' | 'Admin' | 'Supplier';

export default interface User{
    RegId:number;
    Name:string;
    PhoneNo:string;
    Email:string;
    Password:string;
    Gender:gender;
    RegType:regType;
    dlocation:string;
    photo:string;
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
