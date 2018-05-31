import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ArticlePublishComponent} from './article-publish.component';

describe('ArticlePublishComponent', () => {
  let component: ArticlePublishComponent;
  let fixture: ComponentFixture<ArticlePublishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlePublishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlePublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
