export type gender = 'Male' | 'Female';
export type accStatus = 'Pending' | 'Approved' | 'Inactive';
export type RegType = 'Customer' | 'Accountant' | 'Admin' | 'Supplier';

export default interface Users {
    regid?: number;
    name: string;
    phoneno: string;
    email: string;
    password?: string;
    gender: string;
    regtype: RegType;
    dlocation: string;
    photo: ImageData | null | string;
    accstatus: string;
}

export interface UserPayload {
    RegID: number;
    Name?: string;
    PhoneNo?: string;
    Email?: string;
    Password?: string;
    Gender?: string;
    RegType?: string;
    dLocation?: string;
    Photo?: Blob | null;
    accStatus?: string;
}
