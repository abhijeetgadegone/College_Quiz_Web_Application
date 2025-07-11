import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-question-test',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './add-question-test.component.html',
  styleUrl: './add-question-test.component.scss'
})
export class AddQuestionTestComponent {
  
  questionForm!: FormGroup;
  id: number | null;

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private adminService: AdminService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modal: NzModalService
  ) {}

  ngOnInit() {
    this.questionForm = this.fb.group({
      questionText: [null, [Validators.required]],
      option1: [null, [Validators.required]],
      option2: [null, [Validators.required]],
      option3: [null, [Validators.required]],
      option4: [null, [Validators.required]],
      correctOption: [null, [Validators.required]],
    });

    this.id = this.activatedRoute.snapshot.params["id"];
  }

  submitForm() {
    const questionDto = this.questionForm.value;
    questionDto.id = this.id;

    this.adminService.addQuestionTest(questionDto).subscribe(
      (res) => {
        this.notification.success('SUCCESS', 'Question Created Successfully.', { nzDuration: 5000 });

        // Show confirmation modal
        this.modal.confirm({
          nzTitle: 'Question Added Successfully!',
          nzContent: 'Do you want to add another question?',
          nzOkText: 'Yes, Add Another',
          nzCancelText: 'No, Go to Test Dashboard',
          nzOnOk: () => this.resetForm(), // Reset form for new question
          nzOnCancel: () => this.router.navigate([`/admin/view-test/${this.id}`]) // Redirect to the test dashboard
        });
      },
      (error) => {
        this.notification.error('ERROR', `${error.error}`, { nzDuration: 5000 });
      }
    );
  }

  resetForm() {
    this.questionForm.reset();
  }
}
