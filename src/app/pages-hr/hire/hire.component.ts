import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { address } from 'app/models/address';
import { applicationWorkFlow } from 'app/models/applicationWorkFlow';
import { employee } from 'app/models/employee';
import { visaStatus } from 'app/models/visaStatus';
import { AddressService } from 'app/services/address.service';
import { ApplicationWorkFlowService } from 'app/services/application-work-flow.service';
import { EmployeeService } from 'app/services/employee.service';
import { PersonalDocumentService } from 'app/services/personal-document.service';
import { RegistrationtokenService } from 'app/services/registrationtoken.service';
import { VisaStatusService } from 'app/services/visa-status.service';

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
    awfForm : FormGroup;
    employee: employee;
    awfID : any;
    i983: boolean = false;
    disabled1 = true;
    form: boolean = false;
    address: address;
    vs: visaStatus;

    constructor(
        private fb: FormBuilder,
        private employeeService: EmployeeService,
        private awfService: ApplicationWorkFlowService,
        private pdService: PersonalDocumentService,
        private registrationTokenService: RegistrationtokenService,
        private addressService: AddressService,
        private vsService: VisaStatusService
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
            status: 'approved',
            modificationdate: new Date(Date.now()),
            comments: this.comment
        });
        this.updateAWF(this.awfForm.value);
        alert('Application is approved.');
        location.reload();
    }
    reject(): void {
        this.awfForm.patchValue({
            status: 'rejected',
            modificationdate: new Date(Date.now()),
            comments: this.comment
        });
        this.updateAWF(this.awfForm.value);
        alert('Application is rejected.');
        location.reload();
    }
    // approveDoc(): void {
    //     this.updatePD(this.pdForm.value);
    //     this.awfForm.patchValue({
    //         status: '3',
    //         modificationdate: Date.now()
    //     });
    //     this.updateAWF(this.awfForm.value);
    //     alert('Application is approved.');
    //     location.reload();
    // }
    rejectDoc(): void {
        this.updatePD(this.pdForm.value);
        this.awfForm.patchValue({
            status: '2.5',
            modificationdate: new Date(Date.now()),
            comments: this.pdForm.value.comment
        });
        this.updateAWF(this.awfForm.value);
        alert('Application is rejected.');
        location.reload();
    }
    showDetailForm(awf: applicationWorkFlow) {
        this.i983 = false;
        this.form = false;
        this.isDocApp = false;
        this.isFormApp = true;
        this.awfForm.patchValue({
            applicationworkflowID: awf.applicationworkflowID,
            employeeID: awf.employeeID,
            createdate: awf.createdate
        });

        this.employeeService.getEmployee(awf.employeeID).subscribe( 
            data => {this.employee = data;}
        );
        this.addressService.getAddressByEmployeeId(awf.employeeID).subscribe( 
            data => {this.address = data;}
        );
        this.vsService.getVisaStatusByEmployeeID(awf.employeeID).subscribe(
            data => {this.vs = data;}
        );
        
    }
    showDetailDoc(awf: applicationWorkFlow) {
        this.i983 = false;
        this.form = false;
        this.isDocApp = true;
        this.isFormApp = false;
        this.awfForm.patchValue({
            applicationworkflowID: awf.applicationworkflowID,
            employeeID: awf.employeeID,
            createdate: awf.createdate
        });

        this.employeeService.getEmployee(awf.employeeID).subscribe( 
            data => {this.employee = data;});
        

        this.pdService.getPersonalDocumentBy(awf.employeeID, 'I-983').subscribe(
            response => {
                this.pdForm.patchValue(response)
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
        this.i983 = !this.i983;
    }
    showForm() {
        this.form = !this.form;
    }
    onChange() {
        this.disabled1 = !this.disabled1;
    }
}
