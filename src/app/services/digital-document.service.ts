import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { digitalDocument } from '../models/digitalDocument';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DigitalDocumentService {

  constructor(private apiService: ApiService) { }
  getDigitalDocuments(): Observable<digitalDocument[]> {
    return this.apiService.getAll('digitalDocuments/all');
 }
 getDigitalDocument(id: number): Observable<digitalDocument> {
   return this.apiService.getOne('digitalDocuments/all',id);
 }
 createDigitalDocument(digitalDocument : any): Observable<digitalDocument> {
   return this.apiService.create('digitalDocuments/add', digitalDocument);
 }
 updateDocument(digitalDocument : any): Observable<digitalDocument> {
   return this.apiService.update('digitalDocuments/update', digitalDocument);
 }
 deleteDigitalDocument(id: number): Observable<digitalDocument> {
   return this.apiService.delete('digitalDocuments/delete',id);
 }
}
