// import { Component, OnInit } from '@angular/core';

// declare interface TableData {
//     headerRow: string[];
//     dataRows: string[][];
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from 'app/services/employee.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { employee } from 'app/models/employee';



@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit{

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
