import apiFetch from "./utils/apiFetch";

import type { UserPayload } from "../../interfaces/user";
import type { regType } from "../../interfaces/user";

export interface RegisterResponse {
  RegID?: number;
  message?: string;
  error?: string;
}

export default async function registerUser(user: UserPayload): Promise<RegisterResponse> {
  const apiMap: Record<regType, string> = {
    Customer: '/api/customer/public/add',
    Accountant: '/api/accountant/add',
    Admin: '/api/admin/public/add',
    Supplier:'/api/supplier/add',
  };

  const regAPI = user.RegType ? apiMap[user.RegType] : undefined;

  if (!regAPI) {
    throw new Error('Invalid registration type');
  }

  try {
    console.log('I am really here man');
    const result = await apiFetch<RegisterResponse>(regAPI, {
      method: 'POST',
      body: JSON.stringify(user),
    });

    if (result.error) {
      throw new Error(result.error);
    }

    console.log('User registered successfully:', result);
    return result;
  } catch (err) {
    console.error('Error occurred while registering the user:', err);
    throw err;
  }
}
