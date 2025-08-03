import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Test } from '../../../test.model';
import { UserStorageService } from '../../../auth/services/user-storage.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  publishedTests: Test[] = [];
  attemptedTestIds: number[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadPublishedTests();
    this.loadAttemptedTests();
  }

  loadPublishedTests(): void {
    this.http.get<Test[]>('http://localhost:8082/api/test/published')
      .subscribe({
        next: (tests) => {
          this.publishedTests = tests;
        },
        error: (err) => {
          console.error('Failed to load published tests:', err);
        }
      });
  }

  loadAttemptedTests(): void {
    const userId = UserStorageService.getUserId();
    console.log('User ID from UserStorageService:', userId);

    if (userId) {
      this.http.get<number[]>(`http://localhost:8082/api/auth/user/${userId}/attempted-tests`)
        .subscribe({
          next: (ids) => {
            this.attemptedTestIds = ids;
          },
          error: (err) => {
            console.error('Failed to load attempted tests:', err);
          }
        });
    } else {
      console.warn('User ID is missing. Make sure the user is logged in.');
    }
  }

  hasAttempted(testId: number): boolean {
    return this.attemptedTestIds.includes(testId);
  }

  startTest(testId: number): void {
    this.router.navigate(['/user/start-test', testId]);
  }

  async goFullscreen(): Promise<void> {
    const elem = document.documentElement;
    try {
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if ((<any>elem).webkitRequestFullscreen) {
        await (<any>elem).webkitRequestFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  }
}
