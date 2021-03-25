// import { Component, OnInit } from '@angular/core';

// @Component({
//     selector: 'user-cmp',
//     moduleId: module.id,
//     templateUrl: 'user.component.html'
// })

// export class UserComponent implements OnInit{
//     ngOnInit(){
//     }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from 'app/services/employee.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { employee } from 'app/models/employee';


@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
    // id: number = 1; 
    employee: any;

    users!: employee[];

    constructor(
        private employeeService: EmployeeService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router
        ) {}
   
    ngOnInit(){
        this.employeeService.getEmployees()
        .pipe(first())
        .subscribe(users => this.users = users);
    }
    
   
}
