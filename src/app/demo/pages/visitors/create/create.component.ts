import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { VisitorService } from 'src/app/services/visitor/visitor.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from 'src/environments/environment';
import { DeviceService } from './../../../../services/device/device.service';

@Component({
  selector: 'app-create.component',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule, RouterModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  idcard_num: string | null = null;
  name: string | null = null;
  type: string | null = null;
  passtime: string | null = null;
  imageFile: File | null = null;
  group_id: string | null = null;
  devices: any[] = [];
  device_id!: number;

  constructor(private visitorService: VisitorService, private router: Router, private deviceService: DeviceService) {}


  ngOnInit() {
    this.loadDevices();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.imageFile = file;
    }
  }

  createVisitor() {
  if (!this.imageFile) {
    alert('Please select an image file.');
    return;
  }

  const formData = new FormData();
    formData.append('idcard_num', this.idcard_num ?? '');
    formData.append('name', this.name ?? '');
    formData.append('type', String(this.type));
    formData.append('passtime', this.passtime ?? '');
    formData.append('img_base64', this.imageFile);
    formData.append('group_id', this.group_id ?? '');
    formData.append('device_id', this.device_id.toString());

    this.visitorService.createVisitor(formData).subscribe({
      next: () => {
        alert('Visitor successfully created!');
        this.router.navigate(['/visitors']);
      },
      error: (err) => {
        alert('Failed to create visitor. Please try again.');
      }
    });
  }

  loadDevices() {
    this.deviceService.getDevices().subscribe({
      next: (res: any) => {
        this.devices = res.data;
      },
      error: (err) => {
        console.error('Gagal mengambil data device', err);
      }
    });
  }

}
