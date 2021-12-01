import { TestBed } from '@angular/core/testing';

import { DishListService } from './dish-list.service';

describe('DishListService', () => {
  let service: DishListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
