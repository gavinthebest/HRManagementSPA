import { Component, Input, OnInit } from '@angular/core';
import { UploadFileService } from '../../services/upload-file.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { PersonalDocumentService } from 'app/services/personal-document.service';
import { personalDocument } from 'app/models/personalDocument';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {
  @Input() userID: string;
  @Input() employeeID: string;
  @Input() fileType: string;
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  pdForm : FormGroup;

  constructor(
    private fb: FormBuilder,
    private uploadService: UploadFileService,
    private pdService: PersonalDocumentService
    ) { }

  ngOnInit() {
    this.pdForm = this.fb.group({
      personaldocumentID: [''],
      employeeID: [this.employeeID],
      path: [''],
      title: [this.fileType],
      comment: [''],
      createdate: [new Date(Date.now())],    
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;

    //File Upload saved by userID
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.userID, this.fileType).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });

    this.pdService.deletePersonalDocument(+this.employeeID, this.fileType).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
    this.pdService.createPersonalDocument(this.pdForm.value).subscribe(() => {
      console.log('PD created in DB!')
    });

    this.selectedFiles = undefined;
  }

}