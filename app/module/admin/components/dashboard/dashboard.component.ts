import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  tests = [];

  constructor(
    private notification: NzNotificationService,
    private testService: AdminService,
    private router : Router,
  ) {}

  ngOnInit() {
    this.getAllTests();
  }

  getAllTests() {
    this.testService.getAllTest().subscribe(
      (res) => {
        console.log("Received tests from backend:", res); // <-- Add this
  
        this.tests = res.map(test => ({
          ...test,
          isEnabled: test.isEnabled ?? true
        }));
      },
      (error) => {
        console.error("Error fetching tests:", error); // <-- Add this
        this.notification.error('ERROR', 'Something Went Wrong. Try Again', {
          nzDuration: 5000,
        });
      }
    );
  }
  
  getFormattedTime(time: number): string {
    return `${time} minutes`;
  }
  

  deleteTest(testId: number): void {
    const isConfirmed = window.confirm("Are you sure you want to delete this test?");
    
    if (isConfirmed) {
      this.testService.deleteTest(testId).subscribe({
        next: () => {
          console.log("Test deleted successfully");
  
          
          this.tests = this.tests.filter(test => test.id !== testId);
  
         
          this.router.navigateByUrl("/admin/dashboard");
        },
        error: (error) => {
          console.error("Error deleting test:", error);
        }
      });
    }
  }
  
}
