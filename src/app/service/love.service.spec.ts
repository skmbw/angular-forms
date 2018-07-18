import { TestBed, inject } from '@angular/core/testing';

import { LoveService } from './love.service';

describe('LoveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoveService]
    });
  });

  it('should be created', inject([LoveService], (service: LoveService) => {
    expect(service).toBeTruthy();
  }));
});
