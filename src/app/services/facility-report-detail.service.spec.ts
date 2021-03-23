import { TestBed } from '@angular/core/testing';

import { FacilityReportDetailService } from './facility-report-detail.service';

describe('FacilityReportDetailService', () => {
  let service: FacilityReportDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacilityReportDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
