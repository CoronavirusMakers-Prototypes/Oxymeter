import { TestBed } from '@angular/core/testing';

import { UserAsignementService } from './user-asignement.service';

describe('UserAsignementService', () => {
  let service: UserAsignementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAsignementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
