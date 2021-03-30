import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {EmployeeService} from '../../services/employee.service';
import {employee} from '../../models/employee';
import {Router} from '@angular/router';
import {ApplicationWorkFlowService} from '../../services/application-work-flow.service';
import {AddressService} from '../../services/address.service';
import {address} from '../../models/address';
import {visaStatus} from '../../models/visaStatus';
import {VisaStatusService} from '../../services/visa-status.service';
import {PersonalDocumentService} from '../../services/personal-document.service';
import {personalDocument} from '../../models/personalDocument';
import {contact} from '../../models/contact';
import {ContactService} from '../../services/contact.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})

export class OnboardingComponent implements OnInit {
  newUserEmail: string; gender: string; fname: string; lname: string; mname: string;
  ssn: string; dob: Date; address1: string; address2: string; city: string; state: string;
  zipcode: string; phone: string; carMaker: string; carModel: string; carColor: string;
  preferredname: string; alterphone: string; employeeID: string; userID: string;
  picID: string; fileType: string; disableRefresh: boolean;
  auth: string; explainAuth: string; authstart: Date; authend: Date; citiResi: string; carcheck: string; dlid: string;
  dlexp: Date; fnameref: string; lnameref: string; mnameref: string; phoneref: string;
  emailref: string; relationshipref: string; address1ref: string; address2ref: string;
  cityref: string; stateref: string; zipcoderef: string; fnameem: string;
  lnameem: string; mnameem: string; phoneem: string; emailem: string; relationshipem: string; avatar: string;
  auth2: string;
  dlphoto: string;

  constructor(private cookieService: CookieService,
              private employeeService: EmployeeService,
              private router: Router,
              private applicationWorkFlowService: ApplicationWorkFlowService,
              private addressService: AddressService,
              private visaStatusService: VisaStatusService,
              private personalDocumentService: PersonalDocumentService,
              private contactService: ContactService) { }

  ngOnInit(): void {
    this.newUserEmail = this.cookieService.get('email');
    this.employeeID = this.cookieService.get('employeeID');
    this.userID = this.cookieService.get('userID');
    this.fileType = 'png';
    this.disableRefresh = true;
    this.avatar = 'http://localhost:8080/api/file/user_1_avatar.png';
    this.dlphoto = 'http://localhost:8080/api/file/user_1_dl.png';
  }

  registerAttempt(): void {
    let carInfo = '';
    if (this.carcheck) {
      carInfo = this.carMaker + '_' + this.carModel + '_' + this.carColor;
    } else {
      this.dlid = null;
      this.dlexp = null;
    }
    let email: string = this.newUserEmail;
    let hid: number = -1;
    if (Math.floor(Math.random() * 11) > 5){
      hid = 6;
    } else {
      hid = 1;
    }
    let employee: employee = {employeeID: Number(this.employeeID), userID: Number(this.userID), firstname: this.fname, lastname: this.lname,
      middlename: this.mname, email: email, cellphone: this.phone, gender: this.gender, ssn: this.ssn, dob: this.dob,
      avatar: this.userID, car: carInfo, alternatephone: this.alterphone,
      preferredname: this.preferredname, title: null, managerID: null, driverlicense: this.dlid,
      driverlicense_expirationdate: this.dlexp, startdate: null, enddate: null, houseid: hid};

    this.employeeService.createEmployee(employee).subscribe(ob => {
      this.applicationWorkFlowService.getApplicationWorkFlowByEmployeeId(this.employeeID).subscribe(ob2 => {
        ob2.status = 'pending';
        this.applicationWorkFlowService.updateApplicationWorkFlow(ob2).subscribe();
      });
    });

    let address: address = {addressID: null, addressLine1: this.address1, addressLine2: this.address2, city: this.city,
      stateAbbr: this.state, stateName: null, employeeID: Number(this.employeeID), zipcode: this.zipcode};
    this.addressService.createAddress(address).subscribe();

    let workAuth = '';
    if (this.citiResi) {
      workAuth = this.auth;
    } else {
      workAuth = this.auth2;
    }
    let visastatus: visaStatus = {visastatusid: null, active: 1, employeeid: Number(this.employeeID), visatype: workAuth,
      visastartdate: this.authstart, visaenddate: this.authend, modificatoindate: new Date()};
    this.visaStatusService.createVisaStatus(visastatus).subscribe();

    let ref: contact = {contactID: null, employeeID: Number(this.employeeID), relationship: this.relationshipref, title: null,
    fullname: this.fnameref + ' ' + this.mnameref + ' ' + this.lnameref, isreference: 1, isemergency: 0, islandlord: 0,
      phone: this.phoneref, address: this.address1ref + ', ' + this.address2ref + ', ' + this.cityref + ', ' + this.stateref +
    ', ' + this.zipcoderef};
    this.contactService.createContact(ref).subscribe();

    let emg: contact = {contactID: null, employeeID: Number(this.employeeID), relationship: this.relationshipem, title: null,
      fullname: this.fnameem + ' ' + this.mnameem + ' ' + this.lnameem, isreference: 0, isemergency: 1, islandlord: 0,
      phone: this.phoneem, address: null};
    this.contactService.createContact(emg).subscribe();


    this.router.navigate(['']);
  }

  refresh() {
    this.fileType = this.cookieService.get('fileType');
    this.avatar = 'http://localhost:8080/api/file/user_' + this.userID + '_avatar.' + this.fileType + '?t=' + new Date().getTime();
    console.log(this.avatar);
  }

  refresh2() {
    this.fileType = this.cookieService.get('fileType');
    this.dlphoto = 'http://localhost:8080/api/file/user_' + this.userID + '_dl.' + this.fileType + '?t=' + new Date().getTime();
  }
}
