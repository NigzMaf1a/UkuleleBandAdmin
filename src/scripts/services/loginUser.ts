import apiFetch from "./utils/apiFetch";
import type User from "../../interfaces/user";

interface LoginResponse {
  token: string;
  user?: User;
}

interface LogginCreds{
    Email:string;
    Password:string;
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