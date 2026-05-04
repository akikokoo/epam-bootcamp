const BASE = 'http://localhost:3001/api/auth';

export interface AuthResponse {
  success: boolean;
  data?: { token: string; expiresIn: number };
  error?: { code: string; message: string };
}

async function request(path: string, body: object): Promise<AuthResponse> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return res.json();
}

export const authApi = {
  register: (email: string, password: string) => request('/register', { email, password }),
  login: (email: string, password: string) => request('/login', { email, password }),
  resetPassword: (email: string, newPassword: string) => request('/reset-password', { email, newPassword })
};
