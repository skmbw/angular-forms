import {inject, TestBed} from '@angular/core/testing';

import {AnswerService} from './answer.service';

describe('AnswerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnswerService]
    });
  });

  it('should be created', inject([AnswerService], (service: AnswerService) => {
    expect(service).toBeTruthy();
  }));
});
