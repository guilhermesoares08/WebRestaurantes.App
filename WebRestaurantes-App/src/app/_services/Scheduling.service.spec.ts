/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SchedulingService } from './Scheduling.service';

describe('Service: Scheduling', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchedulingService]
    });
  });

  it('should ...', inject([SchedulingService], (service: SchedulingService) => {
    expect(service).toBeTruthy();
  }));
});
