import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { house } from '../models/house';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  constructor(private apiService: ApiService) { }
  getHouses(): Observable<house[]> {
      return this.apiService.getAll('houses/all');
   }
  getHouse(id: number): Observable<house> {
     return this.apiService.getOne('houses/all',id);
   }
  createHouse(house : any): Observable<house> {
     return this.apiService.create('houses/add', house);
   }
  updateHouse(house : any): Observable<house> {
     return this.apiService.update('houses/update', house);
   }
  deleteHouse(id: number): Observable<house> {
     return this.apiService.delete('houses/delete',id);
   }
}
