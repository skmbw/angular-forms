import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RightAnswerComponent} from './right-answer.component';

describe('RightAnswerComponent', () => {
  let component: RightAnswerComponent;
  let fixture: ComponentFixture<RightAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
