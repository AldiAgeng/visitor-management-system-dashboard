import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { VisitorService } from 'src/app/services/visitor/visitor.service';

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-visitors',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule],
  templateUrl: './visitors.component.html',
  styleUrl: './visitors.component.scss'
})
export class VisitorsComponent implements OnInit {
  visitors: any[] = [];
  filterName: string = '';

  constructor(
    private visitorService: VisitorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadVisitors();
  }

  loadVisitors(): void {
    this.visitorService.getVisitors().subscribe({
      next: (res) => {
        this.visitors = res.data || [];
      },
      error: (err) => {
        console.error('Gagal memuat data visitor:', err);
        alert('Gagal memuat data visitor');
      }
    });
  }

  deleteVisitor(id: number): void {
    if (!confirm('Yakin ingin menghapus visitor ini?')) return;

    this.visitorService.deleteVisitor(id).subscribe({
      next: () => {
        this.visitors = this.visitors.filter(visitor => visitor.id !== id);
      },
      error: (err) => {
        console.error('Gagal menghapus visitor:', err);
        alert('Gagal menghapus visitor');
      }
    });
  }

  exportToExcel(): void {
    const filtered = this.visitors.filter((v) => {
      if (!this.filterName) return true;
      return v.name?.toLowerCase().includes(this.filterName.toLowerCase());
    });

    const data = filtered.map((v, i) => ({
      No: i + 1,
      IDCard: v.idcard_num,
      Name: v.name,
      Type: v.type,
      Passtime: v.passtime,
      MD5: v.md5
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { 'Visitors': ws }, SheetNames: ['Visitors'] };
    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    });

    FileSaver.saveAs(blob, `visitors_filtered_${new Date().toISOString()}.xlsx`);
  }
}
