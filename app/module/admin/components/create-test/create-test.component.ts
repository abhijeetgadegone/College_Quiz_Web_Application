import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { NzNotificationComponent, NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-test',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create-test.component.html',
  styleUrl: './create-test.component.scss'
})
export class CreateTestComponent {
  testForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.testForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      time: [null, [Validators.required, Validators.min(1)]],
      enabled: [true]
    });
  }

  submitForm(): void {
    if (this.testForm.valid) {
      this.adminService.createTest(this.testForm.value).subscribe({
        next: (res) => {
          this.notification.success('SUCCESS', 'Test Created Successfully', {
            nzDuration: 3000
          });
          this.router.navigateByUrl('/admin/dashboard');
        },
        error: (err) => {
          this.notification.error('ERROR', err.error?.message || 'Something went wrong', {
            nzDuration: 5000
          });
        }
      });
    } else {
      this.testForm.markAllAsTouched(); // show errors
    }
  }
}
