import { TestBed } from '@angular/core/testing';

import { NeweService } from './newe.service';

describe('NeweService', () => {
  let service: NeweService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeweService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
