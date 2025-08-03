import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { TestService } from '../../sevices/test.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-my-test-results',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './view-my-test-results.component.html',
  styleUrls: ['./view-my-test-results.component.scss']
})
export class ViewMyTestResultsComponent implements OnInit {

  dataSet: any[] = [];

  constructor(private testService: TestService, private router: Router) {}

  ngOnInit(): void {
    this.getTestResults();
  }

  getTestResults(): void {
    this.testService.getMyTestResults().subscribe(
      (res) => {
        console.log('Full response:', res); // Add this to debug
        this.dataSet = res;
      },
      (err) => {
        console.error('Failed to fetch test results:', err);
      }
    );
  }

  getPercentageClass(percentage: number): string {
    if (percentage < 50) return 'low-score';
    if (percentage < 75) return 'medium-score';
    return 'high-score';
  }


  viewCorrectQuestions(testIdFromTable: number) {
  const user = JSON.parse(localStorage.getItem('user') || '{}'); // ✅ correct key
  const userId = user?.id;

  if (!testIdFromTable || !userId) {
    console.warn('User ID or Test ID is missing');
    return;
  }

  this.router.navigate(['/view-correct-questions', userId, testIdFromTable]);
}




  
}
