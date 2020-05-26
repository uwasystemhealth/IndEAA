import { TestBed } from '@angular/core/testing';

import { DLService } from './dl.service';

describe('DLService', () => {
  let service: DLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
