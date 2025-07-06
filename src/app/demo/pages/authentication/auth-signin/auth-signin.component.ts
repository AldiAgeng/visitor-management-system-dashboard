import { LoginResponse } from './../../../../interfaces/login-response';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth-signin',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent {
  username = '';
  password = '';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  login() {
    this.http.post<LoginResponse>(`${environment.baseUrl}/login`, {
    username: this.username,
    password: this.password
  }).subscribe({
    next: (res) => {
      this.auth.setToken(res.data.token);
      this.auth.setRole(res.data.role);
      this.auth.setRefreshToken(res.data.refresh_token);
      const role = res.data.role;

      if (role === 'superuser' || role === 'receptionist') {
        this.router.navigate(['/dashboard']);
      } else if (role === 'administrator') {
        this.router.navigate(['/devices']);
      }
    },
    error: () => alert('Username/password salah')
  });
  }
}
