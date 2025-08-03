import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { TestService } from '../../../user/sevices/test.service';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-view-test-results',
  standalone: true,
  imports: [CommonModule, SharedModule, NzTableModule],
  templateUrl: './view-test-results.component.html',
  styleUrl: './view-test-results.component.scss'
})
export class ViewTestResultsComponent {
  resultData: any[] = [];
  groupedTestResults: any[] = [];

  constructor(private testService: TestService) {}

  ngOnInit() {
    this.getTestResults();
  }

  getTestResults() {
    this.testService.getAllTestResults().subscribe(res => {
      this.resultData = res;
      this.groupResultsByTest();
    }, err => {
      console.error("Error fetching test results:", err);
    });
  }

  groupResultsByTest() {
    const map = new Map<string, any[]>();
    for (const res of this.resultData) {
      if (!map.has(res.testName)) {
        map.set(res.testName, []);
      }
      map.get(res.testName)!.push(res);
    }

    this.groupedTestResults = Array.from(map.entries()).map(([testName, users]) => ({
      testName,
      users,
    }));
  }

  getPercentageClass(percentage: number): string {
    if (percentage >= 75) return 'high-score';
    if (percentage >= 50) return 'medium-score';
    return 'low-score';
  }
}