import { TestBed } from '@angular/core/testing';

import { EocService } from './eoc.service';

describe('EocService', () => {
  let service: EocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
