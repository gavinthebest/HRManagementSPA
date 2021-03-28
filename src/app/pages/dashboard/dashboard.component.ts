import { Component, OnInit } from '@angular/core';
import { employee } from 'app/models/employee';
import { EmployeeService } from 'app/services/employee.service';
import Chart from 'chart.js';
import { CookieService } from 'ngx-cookie-service';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
    id:any;
    employee: employee;
    constructor(
        private cookieService: CookieService,
        private employeeService: EmployeeService,
    ) {}
    
    ngOnInit(){
        this.id = +this.cookieService.get('employeeID');
        this.employeeService.getEmployee(this.id)
        .subscribe(x => this.employee =x);
    }
}
