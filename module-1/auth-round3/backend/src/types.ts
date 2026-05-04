export interface ApiResponse<T = null> {
  success: boolean;
  data?: T;
  error?: { code: string; message: string };
}

export interface TokenData {
  token: string;
  expiresIn: number;
}
