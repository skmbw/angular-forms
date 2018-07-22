import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCommentComponent } from './my-comment.component';

describe('MyCommentComponent', () => {
  let component: MyCommentComponent;
  let fixture: ComponentFixture<MyCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
