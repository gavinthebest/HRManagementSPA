import { TestBed } from '@angular/core/testing';

import { UserRoleService } from './userrole.service';

describe('UserRoleService', () => {
  let service: UserRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
