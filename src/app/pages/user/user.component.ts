import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from 'app/services/employee.service';
import { first } from 'rxjs/operators';
import { AddressService } from 'app/services/address.service';
import { VisaStatusService } from 'app/services/visa-status.service';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
    id: number = 1;
    employee: any;
    form: FormGroup;
    form2: FormGroup;
    form3: FormGroup;
    disabled1: boolean = true;
    disabled2: boolean = true;
    disabled3: boolean = true;
    disabled4: boolean = true;
    disabled5: boolean = true;
    disabled6: boolean = true;
    ngOnInit(){
        this.form = this.formBuilder.group({
            firstname: [''],
            lastname: [''],
            middlename: [''],
            preferredname: [''],
            cellphone: [''],
            alternatephone: [''],
            startdate: [''],
            enddate: [''],
            driverlicense: [''],
            driverlicense_expirationdate: [''],
            employeeID: [''],
            houseID: [''],
            userID: [''],
            email: [''],
            managerID: [''],
            avatar: [''],
            gender: [''],
            ssn: [''],
            title: [''],
            car: [''],
            dob: ['']
        });
        this.form2 = this.formBuilder.group({
            addressID: [''],
            employeeID: [''],
            addressLine1: [''],
            addressLine2: [''],
            city: [''],
            zipcode: [''],
            stateName: [''],
            stateAbbr: ['']
        });
        this.form3 = this.formBuilder.group({
            visastatusid: [''],
            employeeid: [''],
            visatype: [''],
            active: [''],
            modificatoindate: [''],
            visastartdate: [''],
            visaenddate: ['']
        });
        this.employeeService.getEmployee(this.id)
        .pipe(first())
        .subscribe(x => this.form.patchValue(x));
        this.addressService.getAddress(this.id)
        .pipe(first())
        .subscribe(x => this.form2.patchValue(x));
        this.visaStatusService.getVisaStatus(this.id)
        .pipe(first())
        .subscribe(x => this.form3.patchValue(x));
    }
    constructor(
        private employeeService: EmployeeService,
        private addressService: AddressService,
        private visaStatusService: VisaStatusService,
        private formBuilder: FormBuilder,
        ) {}
    onChange1() {
        this.disabled1 = !this.disabled1;
    }
    onChange2() {
        this.disabled2 = !this.disabled2;
    }
    onChange3() {
        this.disabled3 = !this.disabled3;
    }
    onChange4() {
        this.disabled4 = !this.disabled4;
    }
    onChange5() {
        this.disabled5 = !this.disabled5;
    }
    onChange6() {
        this.disabled6 = !this.disabled6;
    }
    onSubmit(): void {
        this.employeeService.updateEmployee(this.form.value)
            .pipe(first())
            .subscribe(() => {
                location.reload();
            });
        console.warn('Your info has been updated', this.form.value);
    }
    onSubmit2(): void {
        this.addressService.updateAddress(this.form2.value)
            .pipe(first())
            .subscribe(() => {
                location.reload();
            });
        console.warn('Your info has been updated', this.form2.value);
    }
    onSubmit3(): void {
        this.visaStatusService.updateVisaStatus(this.form3.value)
            .pipe(first())
            .subscribe(() => {
                location.reload();
            });
        console.warn('Your info has been updated', this.form3.value);
    }
    clickMethod() {
        if(confirm("Are you sure to cancel? Any changes will not be saved.")) {
            location.reload();
        }
      }
}
