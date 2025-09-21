export type gender = 'Male' | 'Female';
export type accStatus = 'Pending' | 'Approved' | 'Inactive';
export type regType = 'Customer' | 'Accountant' | 'Admin' | 'Supplier';

export default interface User{
    RegID:number;
    Name:string;
    PhoneNo:string;
    Email:string;
    Password:string;
    Gender:gender;
    RegType:regType;
    dLocation:string;
    Photo:Blob;
    accStatus:accStatus;
}

export interface UserPayload{
    Name:string;
    PhoneNo:string;
    Email:string;
    Password:string;
    Gender:gender;
    RegType:regType;
    dLocation:string;
    Photo:Blob | null;
    accStatus:accStatus;
}
