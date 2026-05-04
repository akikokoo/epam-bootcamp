const BASE = 'http://localhost:3001/api/auth';

export interface ApiResponse<T = null> {
  success: boolean;
  data?: T;
  error?: { code: string; message: string };
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

async function post<T = null>(path: string, body: object): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    return res.json() as Promise<ApiResponse<T>>;
  } catch {
    return { success: false, error: { code: 'NETWORK_ERROR', message: 'Connection failed. Please try again.' } };
  }
}

export const authApi = {
  register: (email: string, password: string) =>
    post<TokenData>('/register', { email, password }),
  login: (email: string, password: string) =>
    post<TokenData>('/login', { email, password }),
  resetPassword: (email: string, newPassword: string) =>
    post('/reset-password', { email, newPassword })
};
