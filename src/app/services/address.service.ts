import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import {address} from '../models/address';
@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private apiService: ApiService) { }
  getAddresses(): Observable<address[]> {
    return this.apiService.getAll('addresses/all');
  }
  getAddress(id: number): Observable<address> {
    return this.apiService.getOne('addresses/all', id);
  }
  getAddressByEmployeeId(id: number): Observable<address> {
    return this.apiService.getOne('addresses/find',id);
  }
  createAddress(address: any): Observable<address> {
    return this.apiService.create('addresses/add', address);
  }
  updateAddress(address: any): Observable<address> {
    return this.apiService.update('addresses/update', address);
  }
  deleteAddress(id: number): Observable<address> {
    return this.apiService.delete('addresses/delete', id);
  }

}
