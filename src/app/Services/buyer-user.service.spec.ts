import { TestBed } from '@angular/core/testing';

import { BuyerUserService } from './buyer-user.service';

describe('BuyerUserService', () => {
  let service: BuyerUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyerUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
