import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { personalDocument } from '../models/personalDocument';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalDocumentService {

  constructor(private apiService: ApiService) { }
  getPersonalDocuments(): Observable<personalDocument[]> {
    return this.apiService.getAll('personalDocuments/all');
 }
 getPersonalDocument(id: number): Observable<personalDocument> {
   return this.apiService.getOne('personalDocuments/all',id);
 }
 createPersonalDocument(personalDocument : any): Observable<personalDocument> {
   return this.apiService.create('personalDocuments/add', personalDocument);
 }
 updatePersonalDocument(personalDocument : any): Observable<personalDocument> {
   return this.apiService.update('personalDocuments/update', personalDocument);
 }
 deletePersonalDocument(id: number): Observable<personalDocument> {
   return this.apiService.delete('personalDocuments/delete',id);
 }
}
