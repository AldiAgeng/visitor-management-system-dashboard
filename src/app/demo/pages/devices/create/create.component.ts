import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule, RouterModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateDeviceComponent {
  name = '';
  device_key = '';
  group_id = '';

  constructor(private http: HttpClient, private router: Router) {}

  createDevice() {
    const payload = {
      name: this.name,
      device_key: this.device_key,
      group_id: this.group_id
    };

    this.http.post(`${environment.baseUrl}/devices`, payload).subscribe({
      next: () => {
        alert('Device created successfully!');
        this.router.navigate(['/devices']);
      },
      error: () => {
        alert('Failed to create device. Please try again.');
      }
    });
  }
}
