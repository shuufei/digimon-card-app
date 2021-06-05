import { TestBed } from '@angular/core/testing';

import { DispatchCardActionService } from './dispatch-card-action.service';

describe('DispatchCardActionService', () => {
  let service: DispatchCardActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DispatchCardActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
