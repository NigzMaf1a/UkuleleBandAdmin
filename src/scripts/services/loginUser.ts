import apiFetch from "./utils/apiFetch";

export interface UserPayload {
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

interface LoginResponse {
  token: string;
  user?: UserPayload;
}

interface LogginCreds {
  Email: string;
  Password: string;
}
export default async function loginUser(creds: LogginCreds): Promise<LoginResponse> {
  try {
    console.log('We are really here man');
    return await apiFetch<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ Email: creds.Email, Password: creds.Password }),
    });
  } catch (err) {
    console.error('Login error:', err);
    throw err;
  }
}