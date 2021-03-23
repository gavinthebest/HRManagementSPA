import { TestBed } from '@angular/core/testing';

import { ApplicationWorkFlowService } from './application-work-flow.service';

describe('ApplicationWorkFlowService', () => {
  let service: ApplicationWorkFlowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationWorkFlowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
