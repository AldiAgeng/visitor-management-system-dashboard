import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string | null = null;
  private refreshToken: string | null = null;
  private role: string | null = null;

  constructor() {
    this.token = localStorage.getItem('auth_token');
    this.refreshToken = localStorage.getItem('refresh_token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return this.token;
  }

  setRefreshToken(refresh: string) {
    this.refreshToken = refresh;
    localStorage.setItem('refresh_token', refresh);
  }

  getRefreshToken(): string | null {
    return this.refreshToken;
  }

  setRole(role: string) {
    this.role = role;
  }

  getRole(): string | null {
    return this.role;
  }

  is(role: string): boolean {
    return this.role === role;
  }

  isAny(...roles: string[]): boolean {
    return roles.includes(this.role ?? '');
  }

  clearToken() {
    this.token = null;
    this.refreshToken = null;
    this.role = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('role');
  }
}

