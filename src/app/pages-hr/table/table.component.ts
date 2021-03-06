import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from 'app/services/employee.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { employee } from 'app/models/employee';
import { VisaStatusService } from "app/services/visa-status.service";
import { visaStatus } from "app/models/visaStatus";
import { applicationWorkFlow } from "app/models/applicationWorkFlow";
import { ApplicationWorkFlowService} from "app/services/application-work-flow.service";
import { RegistrationtokenService } from 'app/services/registrationtoken.service';
import { UploadFileService } from 'app/services/upload-file.service';

// declare interface TableData {
//     headerRow: string[];
//     dataRows: string[][];
// }

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit{

    employee: any;
    users!: employee[];
    visaStatus!:visaStatus[];
    applicationWorkFlows!:applicationWorkFlow[];
    
    currEmployId:number;
    currEmployee:employee = null;
    // picUrl:string = null;
    expand_employeeId:number;

    picUrl:string = "https://www.exoffender.org/wp-content/uploads/2016/09/empty-profile.png";
    todayDate = new Date();

    fileUploads: string[];
    file_on_view:any;

    ngOnInit(){
        this.employeeService.getEmployees()
        .pipe(first())
        .subscribe(users => this.users = users);

        // this.visaStatusService.getVisaStatusByEmployeeID(this.route.snapshot.params['employeeID'])
        // .pipe(first())
        // .subscribe( data=>{
        //     this.visaStat = data;
        // });

        this.visaStatusService.getAllVisaStatus()
        .pipe(first())
        .subscribe(visaStatus=>this.visaStatus = visaStatus);

        this.uploadService.getFilesById(this.expand_employeeId)
        .subscribe(x => this.fileUploads = x);

        this.applicationWorkFlowService.getApplicationWorkFlows()
        .pipe(first())
        .subscribe(applicationWorkFlow=>this.applicationWorkFlows = applicationWorkFlow);
    }

    constructor(
        private employeeService: EmployeeService,
        private formBuilder: FormBuilder,
        private registrationTokenService: RegistrationtokenService,
        private visaStatusService: VisaStatusService,
        private uploadService: UploadFileService,
        private applicationWorkFlowService: ApplicationWorkFlowService
        // private httpClient: HttpClient
        ) {}

    setCurrEmployId(e){
        // alert(e);
        this.currEmployId = e;
    }

    setCurrEmployee(e){
        this.currEmployee = e;
        // this.picUrl = "https://www.exoffender.org/wp-content/uploads/2016/09/empty-profile.png";
        this.picUrl = "";
    }

    // resetPicUrl(){
    //     this.picUrl = "https://www.exoffender.org/wp-content/uploads/2016/09/empty-profile.png";
    // }

    setPicUrl1(){
        this.picUrl = "https://www.usimmigration.us/assets/images/form-product-hero/i765-product-hero-315e43e7.png";
    }

    setPicUrl2(){
        this.picUrl = "https://images.financialexpress.com/2021/01/h1b-pti-1.jpg";
    }

    setPicUrl3(){
        this.picUrl = "https://www.paydaypayroll.com/wp-content/uploads/2019/11/Restricted-SS-Card.jpg"
    }

    notify(email:string) {
        this.registrationTokenService.notifyEmail(email)
        .subscribe(            
            response => {
            alert(response);
        },
        error => {
          console.log(error);
        });
    }

    trExpand(e){
        if (e == this.expand_employeeId) {
            this.expand_employeeId = null;
        } else {
            this.expand_employeeId = e;
            this.uploadService.getFilesById(this.expand_employeeId)
            .subscribe(x => this.fileUploads = x);
        }
        // this.visaStatusService.getVisaStatusByEmployeeID(1));
    }

    calculateDiff(date: string){
        let d2:string = new Date().toISOString().split('T')[0];
        let d1 = Date.parse(date); //time in milliseconds
        var timeDiff = d1 - Date.parse(d2);
        var diff = timeDiff / (1000 * 3600 * 24);
        return Math.floor(diff);
    }

    viewPdf(e){
        if (e == this.file_on_view) {
            this.file_on_view = null;
        } else {
            this.file_on_view = e;
        }
        this.uploadService.getFilesById(this.expand_employeeId)
        .subscribe(x => this.fileUploads = x);
    }
    
}
