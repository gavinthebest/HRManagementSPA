import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {user} from '../../models/user';
import {CookieService} from 'ngx-cookie-service';
import {RegistrationtokenService} from '../../services/registrationtoken.service';
import {Router} from '@angular/router';
import {EmployeeService} from '../../services/employee.service';
import {ApplicationWorkFlowService} from '../../services/application-work-flow.service';
import {employee} from '../../models/employee';
import {applicationWorkFlow} from '../../models/applicationWorkFlow';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  tokenValidated = false;
  token: string;
  username: string;
  password: string;
  password2: string;
  email: string;

  constructor(private userService: UserService,
              private registrationtokenService: RegistrationtokenService,
              private cookieService: CookieService,
              private router: Router,
              private employeeService: EmployeeService,
              private applicationWorkFlowService: ApplicationWorkFlowService) {}
  ngOnInit(): void {
  }
  validate(form: NgForm): void {
    this.token = form.controls['token'].value;
    console.log(this.token);
    this.registrationtokenService.getRegistrationtokenByToken(this.token).subscribe(reg => {
      this.tokenValidated = (reg != null);
      if (this.tokenValidated) {
        this.email = reg.email;
      }
      console.log(reg);
    });
  }
  registerAttempt(): void {
    let thisDate: Date = new Date();
    let user: user = {userID: null, username: this.username,
      password: this.password, email: this.email, createDate: thisDate, modificationDate: thisDate};
    this.userService.createUser(user).subscribe(ob => {
      this.userService.getUserByUsername(this.username).subscribe(user2 => {
        let userID: number = user2.userID;
        let employee: employee = {employeeID: null, userID: userID, firstname: null, lastname: null,
          middlename: null, email: null, cellphone: null, gender: null, ssn: null, dob: null,
          avatar: null, car: null, alternatephone: null, title: null, managerID: null, preferredname: null,
          driverlicense: null, driverlicense_expirationdate: null, startdate: null, enddate: null, houseID: null};
        this.employeeService.createEmployee(employee).subscribe(ob => {
          console.log('uid: ' + userID);
          this.employeeService.getEmployeeByUserId(String(userID)).subscribe(employee2 => {
            let employeeID: number = employee2.employeeID;
            console.log('eid: ' + employeeID);
            let applicationWorkFlow: applicationWorkFlow = {applicationworkflowID: null, comments: null, createdate: thisDate,
              employeeID: employeeID, modificationdate: thisDate, status: 'open'};
            this.applicationWorkFlowService.updateApplicationWorkFlow(applicationWorkFlow).subscribe();
          });
        });
      });
    });
    alert('Account established, please login to continue your registration.')
    this.router.navigate(['/logout']);
  }
  checkNamePass(): void {
    if (this.password === this.password2) {
      this.userService.getUserByUsername(this.username).subscribe(user1 => {
        if (user1 == null) {
          this.registerAttempt();
        } else {
          console.log('username taken');
        }
      });
    } else {
      console.log('password mismatch');
    }
  }

}
