import { TestBed } from '@angular/core/testing';

import { BedSensorPacientService } from './bed-sensor-pacient.service';

describe('BedSensorPacientService', () => {
  let service: BedSensorPacientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BedSensorPacientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
