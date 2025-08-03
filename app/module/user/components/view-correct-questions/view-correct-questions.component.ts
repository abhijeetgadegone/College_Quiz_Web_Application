import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService } from '../../sevices/test.service';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-view-correct-questions',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './view-correct-questions.component.html',
  styleUrls: ['./view-correct-questions.component.scss']
})
export class ViewCorrectQuestionsComponent implements OnInit {

  testId!: number;
  userId!: number;
  result: any;
  questionsWithAnswers: any[] = [];

  constructor(private route: ActivatedRoute, private testService: TestService) {}

  ngOnInit(): void {
    const userIdParam = this.route.snapshot.paramMap.get('userId');
    console.log(this.userId);
    const testIdParam = this.route.snapshot.paramMap.get('testId');
    console.log(this.testId);

    this.userId = userIdParam ? +userIdParam : 0;
    this.testId = testIdParam ? +testIdParam : 0;

    console.log('userId:', this.userId, 'testId:', this.testId); // 👈 Debug line

    if (this.userId && this.testId) {
      this.testService.getDetailedTestResult(this.userId, this.testId).subscribe({
        next: (result) => {
          this.result = result;
          this.questionsWithAnswers = result.questionResults || [];
        },
        error: (err) => {
          console.error('Failed to load test results:', err);
        }
      });
    } else {
      console.warn('User ID or Test ID is missing.');
    }
  }

  getPercentageClass(percentage: number): string {
    if (percentage < 50) return 'low-score';
    if (percentage < 75) return 'medium-score';
    return 'high-score';
  }
}
