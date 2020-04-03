import { TestBed } from '@angular/core/testing';

import { AlarmsSubscriptionService } from './alarms-subscription.service';

describe('AlarmsSubscriptionService', () => {
  let service: AlarmsSubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlarmsSubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
