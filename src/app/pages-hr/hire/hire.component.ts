import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { applicationWorkFlow } from 'app/models/applicationWorkFlow';
import { employee } from 'app/models/employee';
import { ApplicationWorkFlowService } from 'app/services/application-work-flow.service';
import { EmployeeService } from 'app/services/employee.service';
import { PersonalDocumentService } from 'app/services/personal-document.service';
import { RegistrationtokenService } from 'app/services/registrationtoken.service';

@Component({
    selector: 'hire-cmp',
    moduleId: module.id,
    templateUrl: 'hire.component.html'
})

export class HireComponent implements OnInit{
    isFormApp: boolean = false;
    isDocApp: boolean = false;
    disabled: boolean = true;
    emailFB = new FormGroup({
        email: new FormControl('',[
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
        });
    comment: string = '';
    formOrDocs: applicationWorkFlow[];
    pdForm : FormGroup;
    pdForm2 : FormGroup;
    awfForm : FormGroup;
    employee: employee;
    awfID : any;
    i20: boolean = false;
    i983: boolean = false;

    constructor(
        private fb: FormBuilder,
        private employeeService: EmployeeService,
        private awfService: ApplicationWorkFlowService,
        private pdService: PersonalDocumentService,
        private registrationTokenService: RegistrationtokenService
        ) {}

    ngOnInit(){
        this.awfService.getApplicationWorkFlowByForm()
          .subscribe( data => {
            this.formOrDocs = data;
            console.log(this.formOrDocs);
        });
        this.pdForm = this.fb.group({
            personaldocumentID: [''],
            employeeID: [''],
            path: [''],
            title: [''],
            comment: [''],
            createdate: ['']
        });
        this.pdForm2 = this.fb.group({
            personaldocumentID: [''],
            employeeID: [''],
            path: [''],
            title: [''],
            comment: [''],
            createdate: ['']
        });
        this.awfForm = this.fb.group({
            applicationworkflowID: [''],
            employeeID: [''],
            createdate: [''],
            modificationdate: [''],
            status: [''],
            comments: ['']
        });
    }
    onSubmit(): void {
        this.registrationTokenService.verifyEmail(this.emailFB.value.email)
        .subscribe(            
            response => {
            alert(response);
        },
        error => {
          console.log(error);
        });
    }

    approve(): void {
        this.awfForm.patchValue({
            status: 'completed',
            modificationdate: Date.now(),
            comments: this.comment
        });
        this.updateAWF(this.awfForm.value);
        alert('Application is approved.');
        location.reload();
    }
    reject(): void {
        this.awfForm.patchValue({
            status: 'rejected',
            modificationdate: Date.now(),
            comments: this.comment
        });
        this.updateAWF(this.awfForm.value);
        alert('Application is rejected.');
        location.reload();
    }
    approveDoc(): void {
        this.updatePD(this.pdForm.value);
        this.updatePD(this.pdForm2.value);
        this.awfForm.patchValue({
            status: 'opti20',
            modificationdate: Date.now()
        });
        this.updateAWF(this.awfForm.value);
        alert('Application is approved.');
        location.reload();
    }
    rejectDoc(): void {
        this.updatePD(this.pdForm.value);
        this.updatePD(this.pdForm2.value);
        this.awfForm.patchValue({
            status: 'optead',
            modificationdate: Date.now()
        });
        this.updateAWF(this.awfForm.value);
        alert('Application is rejected.');
        location.reload();
    }
    showDetailForm(awf: applicationWorkFlow) {
        this.i20 = false;
        this.i983 = false;
        this.isDocApp = false;
        this.isFormApp = true;
        this.awfForm.patchValue({
            applicationworkflowID: awf.applicationworkflowID,
            employeeID: awf.employeeID,
            createdate: awf.createdate
        });

        this.employeeService.getEmployee(awf.employeeID).subscribe( 
            data => {this.employee = data;});
    }
    showDetailDoc(awf: applicationWorkFlow) {
        this.i983 = false;
        this.i20 = false;
        this.isDocApp = true;
        this.isFormApp = false;
        this.awfForm.patchValue({
            applicationworkflowID: awf.applicationworkflowID,
            employeeID: awf.employeeID,
            createdate: awf.createdate
        });
        console.log(this.awfForm.value);

        this.employeeService.getEmployee(awf.employeeID).subscribe( 
            data => {this.employee = data;});
        

        this.pdService.getPersonalDocumentBy(awf.employeeID, 'opti983').subscribe(
            response => {
                this.pdForm.patchValue(response)
            },
            error => {
              console.log(error);
            }
        );
        this.pdService.getPersonalDocumentBy(awf.employeeID, 'opti20').subscribe(
            response => {
                this.pdForm2.patchValue(response)
            },
            error => {
                console.log(error);
            }
        );
    }
    updatePD(value: any) {
        this.pdService.updatePersonalDocument(value).subscribe(
            response => {
                console.log(response);
            },
            error => {
                console.log(error);
            }
        );
    }
    updateAWF(value: any) {
        this.awfService.updateApplicationWorkFlow(value).subscribe(
            response => {
                console.log(response);
            },
            error => {
                console.log(error);
            }
        );
    }
    showi983() {
        this.i20 = false;
        this.i983 = true;
    }
    showi20() {
        this.i20 = true;
        this.i983 = false;
    }
}
