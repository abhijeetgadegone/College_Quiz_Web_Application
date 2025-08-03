import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCorrectQuestionsComponent } from './view-correct-questions.component';

describe('ViewCorrectQuestionsComponent', () => {
  let component: ViewCorrectQuestionsComponent;
  let fixture: ComponentFixture<ViewCorrectQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCorrectQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCorrectQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
