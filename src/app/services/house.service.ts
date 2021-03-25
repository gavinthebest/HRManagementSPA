import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { house } from '../models/house';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  constructor(private apiService: ApiService) { }
  getHouses(): Observable<any> {
      return this.apiService.getAll('houses/all');
   }
  getHouse(id: number): Observable<any> {
     return this.apiService.getOne('houses/all',id);
   }
  createHouse(house : any): Observable<any> {
     return this.apiService.create('houses/add', house);
   }
  updateHouse(house : any): Observable<any> {
     return this.apiService.update('houses/update', house);
   }
  deleteHouse(id: number): Observable<any> {
     return this.apiService.delete('houses/delete',id);
   }
}
