import { TestBed } from '@angular/core/testing';

import { DispatchMemoryService } from './dispatch-memory.service';

describe('DispatchMemoryService', () => {
  let service: DispatchMemoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DispatchMemoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
