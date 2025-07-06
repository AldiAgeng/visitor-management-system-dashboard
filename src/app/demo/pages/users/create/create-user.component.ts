import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule, RouterModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  name = '';
  username = '';
  role = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  createUser() {
    const payload = {
      name: this.name,
      username: this.username,
      password: this.password,
      role: this.role
    };

    this.http.post(`${environment.baseUrl}/users`, payload).subscribe({
      next: () => {
        alert('User created successfully!');
        this.router.navigate(['/users']);
      },
      error: (err) => {
        alert('Failed to create user. Please try again.');
      }
    });
  }
}
