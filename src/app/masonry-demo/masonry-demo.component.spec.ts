import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasonryDemoComponent } from './masonry-demo.component';

describe('MasonryDemoComponent', () => {
  let component: MasonryDemoComponent;
  let fixture: ComponentFixture<MasonryDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasonryDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasonryDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
