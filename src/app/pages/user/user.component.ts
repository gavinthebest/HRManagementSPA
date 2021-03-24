import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from 'app/services/employee.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
    id: number = 1;
    employee: any;
    form: FormGroup;
    disabled1: boolean = true;
    disabled2: boolean = true;
    disabled3: boolean = true;
    disabled4: boolean = true;
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
        this.employeeService.getEmployee(this.id)
        .pipe(first())
        .subscribe(x => this.form.patchValue(x));
    }
    constructor(
        private employeeService: EmployeeService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router
        ) {}
    onChange1() {
        this.disabled1 = !this.disabled1;
        console.log(this.form.value.firstname);
    }
    onChange2() {
        this.disabled2 = !this.disabled2;
        console.log(this.disabled2);
    }
    onChange3() {
        this.disabled3 = !this.disabled3;
        console.log(this.disabled3);
    }
    onChange4() {
        this.disabled4 = !this.disabled4;
        console.log(this.disabled4);
    }
    onSubmit(): void {
        this.updateEmployee;
        console.warn('Your info has been updated', this.form.value);
    }
    clickMethod() {
        if(confirm("Are you sure to cancel? Any changes will not be saved.")) {
            location.reload();
        }
      }
    private updateEmployee() {
        this.employeeService.updateEmployee(this.form.value)
            .pipe(first())
            .subscribe(() => {
                this.router.navigate(['../'], { relativeTo: this.route });
            });
    }
}
