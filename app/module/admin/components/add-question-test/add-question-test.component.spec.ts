import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionTestComponent } from './add-question-test.component';

describe('AddQuestionTestComponent', () => {
  let component: AddQuestionTestComponent;
  let fixture: ComponentFixture<AddQuestionTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddQuestionTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuestionTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
