import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { registrationtoken } from '../models/registrationtoken';

@Injectable({
  providedIn: 'root'
})
export class RegistrationtokenService {

  constructor(private apiService: ApiService) { }
  getRegistrationtokens(): Observable<registrationtoken[]> {
      return this.apiService.getAll('registrationTokens/all');
   }
  getRegistrationtoken(id: number): Observable<registrationtoken> {
     return this.apiService.getOne('registrationTokens/all',id);
   }
  createRegistrationtoken(registrationtoken : any): Observable<registrationtoken> {
     return this.apiService.create('registrationTokens/add', registrationtoken);
   }
  updateRegistrationtoken(registrationtoken : any): Observable<registrationtoken> {
     return this.apiService.update('registrationTokens/update', registrationtoken);
   }
  deleteRegistrationtoken(id: number): Observable<registrationtoken> {
     return this.apiService.delete('registrationTokens/delete',id);
   }
}

