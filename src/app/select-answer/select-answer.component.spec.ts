import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectAnswerComponent} from './select-answer.component';

describe('SelectAnswerComponent', () => {
  let component: SelectAnswerComponent;
  let fixture: ComponentFixture<SelectAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
