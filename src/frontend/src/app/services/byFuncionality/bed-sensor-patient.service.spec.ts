import { TestBed } from '@angular/core/testing';

import { BedSensorPatientService } from './bed-sensor-patient.service';

describe('BedSensorPatientService', () => {
  let service: BedSensorPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BedSensorPatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
