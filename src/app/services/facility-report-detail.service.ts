import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { facilityReportDetail } from '../models/facilityReportDetail';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FacilityReportDetailService {

  constructor(private apiService: ApiService) { }
  getFacilityReportDetails(): Observable<facilityReportDetail[]> {
    return this.apiService.getAll('facilityReportDetails/all');
  }
  getFacilityReportDetail(id: number): Observable<facilityReportDetail> {
    return this.apiService.getOne('facilityReportDetails/all',id);
  }
  createFacilityReportDetail(facilityReportDetail : any): Observable<facilityReportDetail> {
    return this.apiService.create('facilityReportDetails/add', facilityReportDetail);
  }
  updateFacilityReportDetail(facilityReportDetail : any): Observable<facilityReportDetail> {
    return this.apiService.update('facilityReportDetails/update', facilityReportDetail);
  }
  deleteFacilityReportDetail(id: number): Observable<facilityReportDetail> {
    return this.apiService.delete('facilityReportDetails/delete',id);
  }

  getFacilityReportDetailsByFacilityReportID(id: number): Observable<any> {
    return this.apiService.getOne('facilityReportDetails/facilityReportDetailByFacilityReportId', id);
  }
 
}
