import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  pushFileToStorage(file: File, userID: any, fileType: any): Observable<any> {
    const formdata: FormData = new FormData();

    let fileName:string = 'user' + userID + fileType;
    let fileExtension:string = file.name.split('?')[0].split('.').pop();
    formdata.append('file', file, fileName+'.'+fileExtension);


    const req = new HttpRequest('POST', `${environment.apiUrl}` + 'file/upload', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any[]> {
    return this.http.get('/api/file/all').pipe(map((resp) => resp as any[]));
  }
  getFilesById(userID: any): Observable<any[]> {
    return this.http.get('/api/file/all/' + userID).pipe(map((resp) => resp as any[]));
  }
}