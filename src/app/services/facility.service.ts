import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { facility } from '../models/facility';


@Injectable({
  providedIn: 'root'
})
export class FacilityService {

constructor(private apiService: ApiService) {}
getFacilities(): Observable<facility[]> {
    return this.apiService.getAll('facilities/all');
 }
 getFacility(id: number): Observable<facility> {
   return this.apiService.getOne('facilities/all',id);
 }
 createFacility(facility : any): Observable<facility> {
   return this.apiService.create('facilities/add', facility);
 }
 updateFacility(facility : any): Observable<facility> {
   return this.apiService.update('facilities/update', facility);
 }
 deleteFacility(id: number): Observable<facility> {
   return this.apiService.delete('facilities/delete',id);
 }

}
