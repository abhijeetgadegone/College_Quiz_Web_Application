import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SharedModule } from '../../../shared/shared.module';
import { UserStorageService } from '../../../auth/services/user-storage.service';
import { TestService } from '../../sevices/test.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Location } from '@angular/common';

@Component({
  selector: 'app-take-test',
  templateUrl: './take-test.component.html',
  styleUrls: ['./take-test.component.scss'],
  imports: [SharedModule],
  standalone: true,
})
export class TakeTestComponent implements OnInit, OnDestroy {
  testId!: number;
  questions: any[] = [];
  answers: { [questionId: number]: string } = {};
  timeLeft!: number;
  interval: any;
  isTestOver = false;
  fullscreenExitCount = 0;
  tabSwitchCount = 0;
  windowBlurCount = 0;

  constructor(
    private route: ActivatedRoute,
    private testService: TestService,
    private notification: NzNotificationService,
    private router: Router,
    private modal: NzModalService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.testId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.testId) {
      this.loadTestQuestions();
    }
    this.goFullscreen();

    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    window.addEventListener('beforeunload', this.preventWindowClose);

    history.pushState(null, '', window.location.href);
    window.onpopstate = () => {
      history.pushState(null, '', window.location.href);
      this.modal.warning({
        nzTitle: 'Back Navigation Blocked',
        nzContent: 'You cannot go back during the test.',
      });
    };
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    window.removeEventListener('beforeunload', this.preventWindowClose);
  }

  @HostListener('document:fullscreenchange', [])
  onFullScreenChange(): void {
    const isFullScreen = !!document.fullscreenElement;

    if (!isFullScreen && !this.isTestOver) {
      this.fullscreenExitCount++;

      if (this.fullscreenExitCount >= 2) {
        this.notification.error(
          'Fullscreen Exited Twice',
          'You exited fullscreen more than once. Your test is being submitted.'
        );
        this.autoSubmitTest();
        return;
      }

      this.modal.confirm({
        nzTitle: 'Fullscreen Mode Exited',
        nzContent: 'You exited fullscreen. You are only allowed to do this once. If you exit again, your test will be submitted.',
        nzOkText: 'Submit Test',
        nzCancelText: 'Continue Test',
        nzOnOk: () => this.autoSubmitTest(),
        nzOnCancel: () => this.goFullscreen(),
        nzMaskClosable: false,
        nzClosable: false,
      });
    }
  }

  @HostListener('window:blur', [])
  onWindowBlur(): void {
    if (!this.isTestOver) {
      this.windowBlurCount++; // Increment window blur count

      if (this.windowBlurCount >= 2) {
        this.notification.error(
          'Window Focus Lost Twice',
          'You lost focus from the test window more than once. Submitting the test.'
        );
        this.autoSubmitTest(); // Auto-submit test
        return;
      }

      this.modal.confirm({
        nzTitle: 'Window Focus Lost',
        nzContent: 'You switched or minimized the window. This is your final warning. One more time and your test will be submitted.',
        nzOkText: 'Submit Test',
        nzCancelText: 'Continue Test',
        nzOnOk: () => this.autoSubmitTest(),
        nzOnCancel: () => {},
        nzMaskClosable: false,
        nzClosable: false,
      });
    }
  }

  handleVisibilityChange = (): void => {
    if (document.hidden && !this.isTestOver) {
      this.tabSwitchCount++; // Increment tab switch count

      if (this.tabSwitchCount >= 2) {
        this.notification.error(
          'Tab Change Detected Twice',
          'You switched browser tabs or minimized the window more than once. Your test is being submitted.'
        );
        this.autoSubmitTest(); // Auto-submit test
        return;
      }

      this.modal.confirm({
        nzTitle: 'Tab Switch Detected',
        nzContent: 'You switched tabs or minimized the window. You are only allowed to do this once. If it happens again, your test will be submitted.',
        nzOkText: 'Submit Test',
        nzCancelText: 'Continue Test',
        nzOnOk: () => this.autoSubmitTest(),
        nzOnCancel: () => {},
        nzMaskClosable: false,
        nzClosable: false,
      });
    }
  };

  preventWindowClose = (event: BeforeUnloadEvent): void => {
    if (!this.isTestOver) {
      event.preventDefault();
      event.returnValue = '';
    }
  };

  goFullscreen(): void {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if ((<any>elem).webkitRequestFullscreen) {
      (<any>elem).webkitRequestFullscreen();
    }
  }

  loadTestQuestions(): void {
    this.testService.getTestQuestions(this.testId).subscribe(
      (res) => {
        if (res) {
          this.questions = res.questions || [];
          const timeInMinutes = res.testDTO?.time;
          if (timeInMinutes && !isNaN(timeInMinutes)) {
            this.timeLeft = timeInMinutes * 60;
            this.startTimer();
          } else {
            this.notification.warning('No Time Set', 'Test time is not configured properly.');
            this.timeLeft = 0;
          }
        } else {
          this.notification.error('ERROR', 'No test details received.');
        }
      },
      () => {
        this.notification.error('ERROR', 'Failed to load test questions.');
      }
    );
  }

  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        if (this.timeLeft === 60) {
          this.modal.warning({
            nzTitle: 'Time Almost Up!',
            nzContent: 'You have only 1 minute left to complete the test.',
          });
        }
      } else {
        clearInterval(this.interval);
        this.autoSubmitTest();
      }
    }, 1000);
  }

  getFormattedTime(): string {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    return `${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;
  }

  getAttemptedQuestionsCount(): number {
    return Object.keys(this.answers).length;
  }

  onAnswerChange(questionId: number, option: string): void {
    if (!this.isTestOver) {
      this.answers[questionId] = option;
    }
  }

  autoSubmitTest(): void {
    this.isTestOver = true;
    this.notification.warning('Time Over!', 'The test has been automatically submitted.');
    this.submitTest(true);
  }

  submitTest(isAutoSubmit: boolean = false): void {
    clearInterval(this.interval);

    const answerList = Object.keys(this.answers).map((questionId) => ({
      questionId: +questionId,
      selectedOption: this.answers[questionId],
    }));

    const userId = UserStorageService.getUserId();
    if (!userId) {
      this.notification.error('ERROR', 'User not found.');
      return;
    }

    const data = {
      testId: this.testId,
      userId: userId,
      responses: answerList,
    };

    this.testService.submitTest(data).subscribe(
      () => {
        this.notification.success(
          'Success',
          isAutoSubmit
            ? 'Test auto-submitted due to time expiry or fullscreen exit.'
            : 'Test submitted successfully!'
        );
        this.router.navigateByUrl(`/user/view-my-test-results`);
      },
      (error) => {
        console.error('Submit test error:', error);
        const errorMessage =
          error?.error?.message ||
          error?.error?.error ||
          'Failed to submit test.';
        this.notification.error('ERROR', errorMessage);
      }
    );
  }

  getAttemptedQuestionNumbers(): number[] {
    return this.questions
      .filter((q) => this.answers[q.id])
      .map((q) => this.questions.indexOf(q) + 1);
  }

  getUnattemptedQuestionNumbers(): number[] {
    return this.questions
      .filter((q) => !this.answers[q.id])
      .map((q) => this.questions.indexOf(q) + 1);
  }
}
