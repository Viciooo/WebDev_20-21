import { TestBed } from '@angular/core/testing';

import { CheckoutAndCurrenciesService } from './checkout-and-currencies.service';

describe('CheckoutAndCurrenciesService', () => {
  let service: CheckoutAndCurrenciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutAndCurrenciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
