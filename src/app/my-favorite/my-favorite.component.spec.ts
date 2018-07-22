import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFavoriteComponent } from './my-favorite.component';

describe('MyFavoriteComponent', () => {
  let component: MyFavoriteComponent;
  let fixture: ComponentFixture<MyFavoriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFavoriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
