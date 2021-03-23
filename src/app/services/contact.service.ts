import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

constructor(private apiService: ApiService) { }
getContacts(): Observable<contact[]> {
    return this.apiService.getAll('contacts/all');
 }
getContact(id: number): Observable<contact> {
   return this.apiService.getOne('contacts/all',id);
 }
createContact(contact : any): Observable<contact> {
   return this.apiService.create('contacts/add', contact);
 }
updateContact(contact : any): Observable<contact> {
   return this.apiService.update('contacts/update', contact);
 }
deleteContact(id: number): Observable<contact> {
   return this.apiService.delete('contacts/delete',id);
 }
}

