import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './users.html',
  styleUrls: ['./users.scss']
})
export class Users implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res.data;
      }
    });
  }

  createUser(): void {
    this.router.navigate(['/users/create']);
  }

  deleteUser(id: number): void {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;

    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(user => user.id !== id);
        alert('User deleted successfully.');
      },
      error: (error) => {
        alert('Failed to delete user. Please try again.');
      }
    });
  }

  exportToExcel() {
    const data = this.users.map((u, i) => ({
      No: i + 1,
      Nama: u.name,
      Username: u.username,
      Role: u.role,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = { Sheets: { 'Users': worksheet }, SheetNames: ['Users'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    });

    FileSaver.saveAs(blob, 'users.xlsx');
  }
}

