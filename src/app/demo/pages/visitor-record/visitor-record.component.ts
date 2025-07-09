import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule, FormsModule],
  selector: 'app-visitor-record',
  templateUrl: './visitor-record.component.html',
  styleUrls: ['./visitor-record.component.scss'],
})
export class VisitorRecordComponent implements OnInit {
  deviceKey: string = '';
  idCardNum: string = '';
  visitorRecord: any[] = [];
  filteredVisitors: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    let params = new HttpParams();
    if (this.deviceKey) params = params.set('device_key', this.deviceKey);
    if (this.idCardNum) params = params.set('idcard_num', this.idCardNum);

    this.http.get<any>(`${environment.baseUrl}/visitor-records`, { params }).subscribe({
      next: (res) => {
        this.visitorRecord = res.data;
        this.filteredVisitors = [...res.data];
      },
      error: (err) => {
        console.error('Failed to load visitor data:', err);
      }
    });
  }

  exportToExcel(): void {
    const data = this.filteredVisitors.map((v, i) => ({
      No: i + 1,
      GroupID: v.group_id,
      DeviceKey: v.device_key,
      IDCard: v.idcard_num,
      RecordID: v.record_id,
      Time: v.time,
      Type: v.type,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { Visitors: ws }, SheetNames: ['Visitors'] };
    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });

    FileSaver.saveAs(blob, `visitors_filtered_${new Date().toISOString()}.xlsx`);
  }
}
