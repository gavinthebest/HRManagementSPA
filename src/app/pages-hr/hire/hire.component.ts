import { Component, OnInit } from '@angular/core';
import { applicationWorkFlow } from 'app/models/applicationWorkFlow';
import { ApplicationWorkFlowService } from 'app/services/application-work-flow.service';

declare interface HireData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'hire-cmp',
    moduleId: module.id,
    templateUrl: 'hire.component.html'
})

export class HireComponent implements OnInit{
    isFormApp: boolean = false;
    isDocApp: boolean = false;
    disabled: boolean = true;
    formOrDocs: applicationWorkFlow[];

    constructor(
        private awfService: ApplicationWorkFlowService,
        ) {}

    ngOnInit(){
        this.awfService.getApplicationWorkFlowByForm()
          .subscribe( data => {
            this.formOrDocs = data;
            console.log(this.formOrDocs);
          });
    }
    onSubmit(): void {

    }
    approve(): void {
        location.reload();
    }
    reject(): void {
        location.reload();
    }
    showDetailForm(employeeID: any) {
        this.isDocApp = false;
        this.isFormApp = true;
    }
    showDetailDoc(employeeID: any) {
        this.isDocApp = true;
        this.isFormApp = false;
    }
}
