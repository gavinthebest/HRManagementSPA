import { Component, Input, OnInit } from '@angular/core';
import { UploadFileService } from '../../services/upload-file.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { PersonalDocumentService } from 'app/services/personal-document.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import { ApplicationWorkFlowService } from 'app/services/application-work-flow.service';
import { applicationWorkFlow } from 'app/models/applicationWorkFlow';

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
  workFlow: applicationWorkFlow;

  constructor(
    private fb: FormBuilder,
    private uploadService: UploadFileService,
    private pdService: PersonalDocumentService,
    private cookieService: CookieService,
    private awfService: ApplicationWorkFlowService
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
    this.awfService.getApplicationWorkFlowByEmployeeId(this.employeeID)
    .subscribe(
        data => {
            this.workFlow =data;
        });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;

    //File Upload saved by userID
    this.currentFileUpload = this.selectedFiles.item(0);
    const fileType: string = this.currentFileUpload.name.split('.').pop();
    this.cookieService.set('fileType', fileType);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.userID, this.fileType).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });

    if (this.workFlow.status == 'optpending') {
        this.workFlow.comments = null;
        this.workFlow.status = '3';
    } else {
      switch(this.workFlow.status) { 
        case 'approved': { 
          this.workFlow.status = '1';
          break; 
        } 
        case '2': { 
          this.workFlow.status = 'optpending';
          break; 
        } 
        case '2.5': { 
          this.workFlow.status = 'optpending';
          break; 
        } 
        default: { 
          this.workFlow.status = (+this.workFlow.status + 1).toString();
          break; 
        } 
    }

   } 
   this.workFlow.modificationdate = new Date(Date.now());
   this.awfService.updateApplicationWorkFlow(this.workFlow).subscribe(() => {
      console.log('workflow saved')
    });

   //Save file info to PersonalDocument table
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
