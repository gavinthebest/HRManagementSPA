import { TestBed } from '@angular/core/testing';

import { RegistrationtokenService } from './registrationtoken.service';

describe('RegistrationtokenService', () => {
  let service: RegistrationtokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationtokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
