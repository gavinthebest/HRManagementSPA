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
  preferredname: string;
  alterphone: string;
  employeeID: string;
  userID: string;
  picID: string;
  fileType: string;
  disableRefresh: boolean;

  constructor(private cookieService: CookieService,
              private employeeService: EmployeeService,
              private router: Router,
              private applicationWorkFlowService: ApplicationWorkFlowService) { }

  ngOnInit(): void {
    this.newUserEmail = this.cookieService.get('email');
    this.employeeID = this.cookieService.get('employeeID');
    this.userID = this.cookieService.get('userID');
    this.picID = '1';
    this.fileType = 'png';
    this.disableRefresh = true;
  }

  registerAttempt(): void {
    let email: string = this.newUserEmail;
    this.employee = {employeeID: Number(this.employeeID), userID: Number(this.userID), firstname: this.fname, lastname: this.lname,
      middlename: this.mname, email: email, cellphone: this.phone, gender: this.gender, ssn: this.ssn, dob: this.dob,
      avatar: 'standby', car: this.carMaker + '_' + this.carModel + '_' + this.carColor, alternatephone: this.alterphone,
      preferredname: this.preferredname, title: null, managerID: null, driverlicense: null,
      driverlicense_expirationdate: null, startdate: null, enddate: null, houseid: null};
    this.employeeService.createEmployee(this.employee).subscribe(ob => {
      this.applicationWorkFlowService.getApplicationWorkFlowByEmployeeId(this.employeeID).subscribe(ob2 => {
        ob2.status = 'pending';
        this.applicationWorkFlowService.updateApplicationWorkFlow(ob2).subscribe();
      });
    });
    this.router.navigate(['']);
  }

  refresh() {
    this.picID = this.userID;
    this.fileType = this.cookieService.get('fileType');
    this.disableRefresh = false;
  }
}
