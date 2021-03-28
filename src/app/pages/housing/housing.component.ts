import { Component, OnInit } from '@angular/core';
import { HouseService } from 'app/services/house.service';
//import { Housing } from 'app/pages/housing/housing.model';
import { Observable, Subject} from "rxjs";
import { house } from 'app/models/house';
import { EmployeeService } from 'app/services/employee.service';
import { employee } from 'app/models/employee';
import { filter, first, map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FacilityReportService } from 'app/services/facility-report.service';
import { facilityReport } from 'app/models/facilityReport';
import { Router, ActivatedRoute } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import { data } from 'jquery';



declare interface HousingData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'housing-cmp',
    moduleId: module.id,
    templateUrl: 'housing.component.html'
})

export class HousingComponent implements OnInit{

    id: number = 1;
    house : house;
    hide = true;
    eid :number;
    emids :number[];
    employee : employee;
    employees : employee[];
    facilityreports : facilityReport[];
    form: FormGroup;
    employeeID: string;

    constructor(
        private cookieService: CookieService,
        private housingservice : HouseService,
        private employeeservice : EmployeeService,
        private formBuilder: FormBuilder,
        private facilityReportService: FacilityReportService,
        private route: ActivatedRoute){}

    ngOnInit() {

        this.employeeID = this.cookieService.get('employeeID');
        this.form = this.formBuilder.group({
          facilityreportid: [''],
          title: [''],
          employeeid: [this.employeeID],
          reportdate: [Date.now()],
          description: [''],
          status: ['open']
      });

        //find house by employee id
        //get employee id from cookie later
        this.housingservice.getHouse(this.id)
          .subscribe( data => {
            this.house = data;
          });

        //find employees by house id
        //sychronous running for service method
        this.employeeservice.getEmployee(1)
        .subscribe( data => {
            this.eid = data.houseid;
            this.employeeservice.getEmployeesByHouseID(this.eid)
           .subscribe( data => {
            this.employees = data;
          });
          });

        //find facility report by houseID
        this.employeeservice.getEmployee(1)
        .subscribe( data => {
            this.eid = data.houseid;
            this.facilityReportService.getFacilitiesReportByHouseID(this.eid)
           .subscribe( data => {
            this.facilityreports = data;
          });
          });

        };

      onChange() {
        this.hide = !this.hide;
      }

      onSubmit(): void {
        this.facilityReportService.createPacilityReport(this.form.value)
            .pipe(first())
            .subscribe(() => {
                location.reload();
            });
        console.warn('Your info has been updated', this.form.value);
    }



}
