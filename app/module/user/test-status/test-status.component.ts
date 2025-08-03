import { Component, Input } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-status',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './test-status.component.html',
  styleUrl: './test-status.component.scss'
})
export class TestStatusComponent {
  @Input() testId!: number;
  @Input() testName!: string;
  @Input() isSubmitted!: boolean;

  constructor(private router: Router) {}

  startTest() {
    this.router.navigate(['/user/take-test', this.testId]);
  }

  viewTest() {
    this.router.navigate(['/user/view-my-test-results', this.testId]);
  }
}
