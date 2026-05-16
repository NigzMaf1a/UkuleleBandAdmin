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
    dLocation:string;
    Photo:string;
    accStatus:accStatus;
}

export interface UserPayload{
    Name?:string;
    PhoneNo?:string;
    Email?:string;
    Password?:string;
    Gender?:string;
    RegType?:string;
    dLocation?:string;
    Photo?:Blob | null;
    accStatus?:string;
}
