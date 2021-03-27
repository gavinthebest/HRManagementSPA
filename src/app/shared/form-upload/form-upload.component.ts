import { Component, Input, OnInit } from '@angular/core';
import { UploadFileService } from '../../services/upload-file.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { PersonalDocumentService } from 'app/services/personal-document.service';
import { personalDocument } from 'app/models/personalDocument';
import { DatePipe } from '@angular/common';

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
  pd : personalDocument;

  constructor(
    private uploadService: UploadFileService,
    private pdService: PersonalDocumentService,
    private datePipe: DatePipe
    ) { }

  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.userID, this.fileType).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });

    this.pd.employeeID = +this.employeeID;
    this.pd.title = this.fileType;
    this.pd.createdate = new Date();
    this.datePipe.transform(this.pd.createdate,"yyyy-MM-dd");
    this.pdService.createPersonalDocument(this.pd);

    this.selectedFiles = undefined;
  }

}