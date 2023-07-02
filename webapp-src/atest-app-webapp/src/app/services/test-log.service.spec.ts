import { TestBed } from '@angular/core/testing';

import { TestLogService } from './test-log.service';

describe('TestLogService', () => {
  let service: TestLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
