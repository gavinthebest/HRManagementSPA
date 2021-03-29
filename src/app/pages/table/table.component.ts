import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'app/services/employee.service';
import { employee } from 'app/models/employee';
import {CookieService} from 'ngx-cookie-service';
import { VisaStatusService } from "app/services/visa-status.service";
import { applicationWorkFlow } from "app/models/applicationWorkFlow";
import { ApplicationWorkFlowService } from "app/services/application-work-flow.service";
import { data } from 'jquery';
import { visaStatus } from 'app/models/visaStatus';


// declare interface TableData {
//     headerRow: string[];
//     dataRows: string[][];
// }

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html',
    styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit{

    userID: string;
    employee : employee;
    employeeID: string;
    visaStatus!:visaStatus;
    workFlow!:applicationWorkFlow;
    flowNo: number;
    files = ['OPT Receipt', 'OPT EAD', 'I-983', 'I-20', 'OPT STEM Receipt', 'OPT STEM EAD'];
    fileType = ['OPT_Receipt', 'OPT_EAD', 'I-983', 'I-20', 'OPT_STEM_Receipt', 'OPT_STEM_EAD'];
    disabled = true;

    constructor(
        private cookieService: CookieService,
        private employeeservice : EmployeeService,
        private visaStatusService: VisaStatusService,
        private applicationWorkFlow: ApplicationWorkFlowService
        ){}   

    ngOnInit(){

        this.employeeID = this.cookieService.get('employeeID');
        this.userID = this.cookieService.get('userID');


        this.visaStatusService.getVisaStatusByEmployeeID(+this.employeeID)
            .subscribe(
                data => {
                    this.visaStatus = data;
                });
        this.applicationWorkFlow.getApplicationWorkFlowByEmployeeId(this.employeeID)
            .subscribe(
                data => {
                    this.workFlow =data;
                    switch(this.workFlow.status) { 
                        case 'approved': { 
                           this.flowNo = 0;
                           break; 
                        } 
                        case 'optpending': { 
                            this.flowNo = 3.5;
                           break; 
                        } 
                        default: { 
                            this.flowNo = +this.workFlow.status;
                           break; 
                        } 
                     } 
                });

    }
    onChange() {
        this.disabled = !this.disabled;
    }
    
}
