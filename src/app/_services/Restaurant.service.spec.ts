/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RestaurantService } from './Restaurant.service';

describe('Service: Restaurant', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestaurantService]
    });
  });

  it('should ...', inject([RestaurantService], (service: RestaurantService) => {
    expect(service).toBeTruthy();
  }));
});
