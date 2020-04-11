import { TestBed } from '@angular/core/testing';

import { AlarmsService } from './alarms.service';

describe('AlarmsService', () => {
  let service: AlarmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlarmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
