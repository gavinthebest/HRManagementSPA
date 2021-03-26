import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { facility } from '../models/facility';


@Injectable({
  providedIn: 'root'
})
export class FacilityService {

constructor(private apiService: ApiService) {}
 getFacilities(): Observable<any> {
    return this.apiService.getAll('facilities/all');
 }
 getFacility(id: number): Observable<any> {
   return this.apiService.getOne('facilities/all',id);
 }
 createFacility(facility : any): Observable<any> {
   return this.apiService.create('facilities/add', facility);
 }
 updateFacility(facility : any): Observable<any> {
   return this.apiService.update('facilities/update', facility);
 }
 deleteFacility(id: number): Observable<any> {
   return this.apiService.delete('facilities/delete',id);
 }

 getFacilitiesByHouseID(id: number): Observable<any> {
  return this.apiService.getOne('facilities/facilityByHouseId', id);
}

getFacilitiesByEmployeeID(id: number): Observable<any> {
  return this.apiService.getOne('facilities/facilityEmployeeId', id );
}

}
