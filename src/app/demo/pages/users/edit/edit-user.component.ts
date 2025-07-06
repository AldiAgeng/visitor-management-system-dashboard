import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule, RouterModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  id: number;
  name = '';
  username = '';
  role = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUser();
  }

  loadUser() {
    this.http.get<any>(`${environment.baseUrl}/users/${this.id}`).subscribe({
      next: (res) => {
        const user = res.data;
        this.name = user.name;
        this.username = user.username;
        this.role = user.role;
      },
      error: () => alert('Failed to load user')
    });
  }

  updateUser() {
    const payload = {
      name: this.name,
      username: this.username,
      role: this.role
    };

    this.http.put(`${environment.baseUrl}/users/${this.id}`, payload).subscribe({
      next: () => {
        alert('User updated!');
        this.router.navigate(['/users']);
      },
      error: () => alert('Failed to update user')
    });
  }
}
