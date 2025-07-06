export interface LoginResponse {
  code: number;
  status: string;
  message: string;
  data: {
    token: string;
    refresh_token: string;
    role: string;
  };
}
