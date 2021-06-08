import { TestBed } from '@angular/core/testing';

import { DispatchDeckService } from './dispatch-deck.service';

describe('DispatchDeckService', () => {
  let service: DispatchDeckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DispatchDeckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
