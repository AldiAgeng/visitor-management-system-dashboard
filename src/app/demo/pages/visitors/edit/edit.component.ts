import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from 'src/environments/environment';
import { VisitorService } from 'src/app/services/visitor/visitor.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule, RouterModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  id!: number;
  name: string = '';
  idcard_num: string = '';
  type: number = 1;
  passtime: string = '';
  imageFile: File | null = null;
  group_id: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private visitorService: VisitorService,
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.visitorService.getVisitor(this.id).subscribe({
      next: (res) => {
        const visitor = res.data;
        this.name = visitor.name;
        this.idcard_num = visitor.idcard_num;
        this.type = visitor.type;
        this.passtime = visitor.passtime;
        this.group_id = visitor.group_id;
      },
      error: () => {
        alert('Failed to load visitor. Please try again.');
        this.router.navigate(['/visitors']);
      }
    })
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.imageFile = file;
    }
  }

  updateVisitor(): void {
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('idcard_num', this.idcard_num);
    formData.append('type', String(this.type));
    formData.append('passtime', this.passtime);
    formData.append('group_id', this.group_id);

    if (this.imageFile) {
      formData.append('img_base64', this.imageFile);
    }

    this.visitorService.updateVisitor(this.id, formData).subscribe({
      next: () => {
        alert('Visitor successfully updated!');
        this.router.navigate(['/visitors']);
      },
      error: (err) => {
        alert('Failed to update visitor. Please try again.');
      }
    });
  }
}
