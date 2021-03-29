import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import {visaStatus} from 'app/models/visaStatus';
@Injectable({
  providedIn: 'root'
})
export class VisaStatusService {

  constructor(private apiService: ApiService) { }
  getAllVisaStatus(): Observable<visaStatus[]> {
    return this.apiService.getAll('visaStatus/all');
 }
 getVisaStatus(id: number): Observable<visaStatus> {
   return this.apiService.getOne('visaStatus/all',id);
 }
 createVisaStatus(visaStatus : any): Observable<visaStatus> {
   return this.apiService.create('visaStatus/add', visaStatus);
 }
 updateVisaStatus(visaStatus : any): Observable<visaStatus> {
   return this.apiService.update('visaStatus/update', visaStatus);
 }
 deleteVisaStatus(id: number): Observable<visaStatus> {
   return this.apiService.delete('visaStatus/delete',id);
 }
 getVisaStatusByEmployeeID(id: number): Observable<visaStatus> {
  return this.apiService.getOne('visaStatus/find', id);
}

}
