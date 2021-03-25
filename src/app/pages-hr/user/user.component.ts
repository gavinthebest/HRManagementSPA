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


import { Component, DoCheck, OnInit } from '@angular/core';
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
    search: string = "";
    currentUsers!: employee[];
    users!: employee[];


    constructor(
        private employeeService: EmployeeService
        ) {}

   
    ngOnInit(){
        this.employeeService.getEmployees()
        .pipe(first())
        .subscribe(users => this.currentUsers = this.users = users);
    }
    
   
}
