import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { facilityReport } from '../models/facilityReport';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FacilityReportService {

  constructor(private apiService: ApiService) { }
  getFacilityReports(): Observable<facilityReport[]> {
    return this.apiService.getAll('facilityReports/all');
 }
 getFacilityReport(id: number): Observable<facilityReport> {
   return this.apiService.getOne('facilityReports/all',id);
 }
 createPacilityReport(facilityReport : any): Observable<facilityReport> {
   return this.apiService.create('facilityReports/add', facilityReport);
 }
 updateFacilityReport(facilityReport : any): Observable<facilityReport> {
   return this.apiService.update('facilityReports/update', facilityReport);
 }
 deleteFacilityReport(id: number): Observable<facilityReport> {
   return this.apiService.delete('facilityReports/delete',id);
 }
}
