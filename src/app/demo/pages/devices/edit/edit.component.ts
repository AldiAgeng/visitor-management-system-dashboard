import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule, RouterModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditDeviceComponent implements OnInit {
  id: number;
  name = '';
  device_key = '';
  group_id = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.http.get<any>(`${environment.baseUrl}/devices/${this.id}`).subscribe({
      next: (res) => {
        const device = res.data;
        this.name = device.name;
        this.device_key = device.device_key;
        this.group_id = device.group_id;
      },
      error: () => {
        alert('Failed to load device. Please try again.');
        this.router.navigate(['/devices']);
      }
    });
  }

  updateDevice() {
    const payload = {
      name: this.name,
      device_key: this.device_key,
      group_id: this.group_id
    };

    this.http.put(`${environment.baseUrl}/devices/${this.id}`, payload).subscribe({
      next: () => {
        alert('Device updated!');
        this.router.navigate(['/devices']);
      },
      error: () => {
        alert('Failed to update device. Please try again.');
      }
    });
  }
}
