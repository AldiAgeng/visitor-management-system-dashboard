import { DeviceService } from './../../../services/device/device.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-devices.component',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.scss'
})
export class DevicesComponent {
  devices: any[] = [];

  constructor(private deviceService: DeviceService, private router: Router) {}

  ngOnInit(): void {
    this.loadDevices();
  }

  loadDevices() {
    this.deviceService.getDevices().subscribe({
      next: (res) => {
        this.devices = res.data;
      }
    });
  }

  deleteDevice(id: number): void {
    const confirmed = window.confirm('Are you sure you want to delete this device?');
    if (!confirmed) return;

    this.deviceService.deleteDevice(id).subscribe({
      next: () => {
        this.devices = this.devices.filter(device => device.id !== id);
        alert('device deleted successfully.');
      },
      error: (error) => {
        alert('Failed to delete device. Please try again.');
      }
    });
  }

    exportToExcel() {
      const data = this.devices.map((u, i) => ({
        No: i + 1,
        Nama: u.name,
        Key: u.device_key,
        Group: u.group_id
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = { Sheets: { 'Devices': worksheet }, SheetNames: ['Devices'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
      });

      FileSaver.saveAs(blob, 'devices.xlsx');
    }
}
