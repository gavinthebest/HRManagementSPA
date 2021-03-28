import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {EmployeeService} from '../../services/employee.service';
import {employee} from '../../models/employee';
import {Router} from '@angular/router';
import {ApplicationWorkFlowService} from '../../services/application-work-flow.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})

export class OnboardingComponent implements OnInit {
  newUserId: string;
  newUserEmail: string;
  gender: string;
  fname: string;
  lname: string;
  mname: string;
  ssn: string;
  dob: Date;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipcode: string;
  phone: string;
  carMaker: string;
  carModel: string;
  carColor: string;
  employee: employee;

  constructor(private cookieService: CookieService,
              private employeeService: EmployeeService,
              private router: Router,
              private applicationWorkFlowService: ApplicationWorkFlowService) { }

  ngOnInit(): void {
    this.newUserEmail = this.cookieService.get('email');
  }

  registerAttempt(): void {
    let thisDate: Date = new Date();
    let employeeID: number = Number(this.cookieService.get('employeeID'));
    let userID: number = Number(this.cookieService.get('userID'));
    let email: string = this.newUserEmail;
    this.employee = {employeeID: employeeID, userID: userID, firstname: this.fname, lastname: this.lname,
      middlename: this.mname, email: email, cellphone: this.phone, gender: this.gender, ssn: this.ssn, dob: this.dob,
      avatar: 'standby', car: this.carMaker + '_' + this.carModel + '_' + this.carColor, alternatephone: null, preferredname: null,
      title: null, managerID: null, driverlicense: null, driverlicense_expirationdate: null, startdate: null, enddate: null, houseid: null};
    this.employeeService.createEmployee(this.employee).subscribe(ob => {
      this.applicationWorkFlowService.getApplicationWorkFlowByEmployeeId(String(employeeID)).subscribe(ob2 => {
        ob2.status = 'pending';
        this.applicationWorkFlowService.updateApplicationWorkFlow(ob2).subscribe();
      });
    });
    this.router.navigate(['']);
  }
}
