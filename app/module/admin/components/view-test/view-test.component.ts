import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-test',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './view-test.component.html',
  styleUrl: './view-test.component.scss',
})
export class ViewTestComponent implements OnInit {
  questions: any[] = [];
  testId: any;

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private router: Router // Inject the Router service
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(param => {
      this.testId = +param.get('id');
      this.adminService.getTestQuestions(this.testId).subscribe(res => {
        this.questions = res.questions;
        this.questions.forEach(q => q.editing = false); // add editing flag
        console.log(this.questions);
      });
    });
  }

  enableEdit(question: any) {
    question.editing = true;
  }

  cancelEdit(question: any) {
    question.editing = false;
  }

  saveEdit(question: any) {
    this.adminService.updateQuestion(question).subscribe(
      res => {
        question.editing = true;
        alert('Question updated successfully!');
      },
      err => {
        alert('Question updated successfully!');
        console.error(err);
      }
    );
  }

  goToAddQuestion() {
    this.router.navigate(['/admin/add-question', this.testId]);
  }
}
