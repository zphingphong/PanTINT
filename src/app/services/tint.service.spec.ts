import { TestBed, inject } from '@angular/core/testing';

import { TintService } from './tint.service';

describe('TintService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TintService]
    });
  });

  it('should be created', inject([TintService], (service: TintService) => {
    expect(service).toBeTruthy();
  }));
});
