import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AdminService } from '../services/admin.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-test-list',
  standalone: true,
  imports: [CommonModule, NzTagModule, NzButtonModule, SharedModule],
  templateUrl: './test-list-component.html',
  styleUrls: ['./test-list-component.scss']
})
export class TestListComponent implements OnInit {
  tests: any[] = [];

  constructor(
    private adminService: AdminService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.fetchTests();
  }

  fetchTests(): void {
    this.adminService.getAllTest().subscribe({
      next: (res: any) => {
        this.tests = res;
      },
      error: () => {
        this.notification.error('Error', 'Failed to fetch tests');
      }
    });
  }

  togglePublish(testId: number, currentStatus: boolean): void {
    const newStatus = !currentStatus;

    this.adminService.updatePublishStatus(testId, newStatus).subscribe({
      next: () => {
        this.notification.success('Success', `Test ${newStatus ? 'Published' : 'Unpublished'} successfully`);
        this.fetchTests(); // refresh list
      },
      error: () => {
        this.notification.error('Error', 'Failed to update test status');
      }
      
    });
  }
}
