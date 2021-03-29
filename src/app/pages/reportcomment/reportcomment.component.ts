import { Component, OnInit } from '@angular/core';
import { facilityReport } from 'app/models/facilityReport';
import { FacilityReportService } from 'app/services/facility-report.service';
import { EmployeeService } from 'app/services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FacilityReportDetailService } from 'app/services/facility-report-detail.service';
import { facilityReportDetail } from 'app/models/facilityReportDetail';
import { FormBuilder, FormGroup } from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import { filter, first, map } from 'rxjs/operators';

@Component({
  selector: 'app-reportcomment',
  templateUrl: './reportcomment.component.html',
  styleUrls: ['./reportcomment.component.css']
})
export class ReportcommentComponent implements OnInit {

  facilityreport: facilityReport;
  form: FormGroup;
  facilityreportdetails : facilityReportDetail[];
  employeeID: string;
  forms: FormGroup[] = [];
  disableUpdate2 :Array<boolean> = new Array();
  
  
  hide = true;

  constructor(private facilityreportservice : FacilityReportService,
              private facilityReportDetailService: FacilityReportDetailService,
              private employeeService: EmployeeService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private cookieService: CookieService) {}

  ngOnInit() {
    
    this.employeeID = this.cookieService.get('employeeID');
    this.form = this.formBuilder.group({
      facilityreportdetailID: [''],
      facilityreportid: ['' + this.route.snapshot.params['facilityreportID']],
      employeeid: [this.employeeID],
      comments: [''],
      createddate: [Date.now()],
      lastmodificationdate: ['']
  });

    this.facilityreportservice.getFacilityReport(this.route.snapshot.params['facilityreportID'])
        .subscribe( data => {
          this.facilityreport = data;
          this.employeeService.getEmployee(this.facilityreport.employeeid).subscribe(data => {
            this.facilityreport.username = data.firstname;
          })
        });


    //find facility report detail by facility report id
    this.facilityReportDetailService.getFacilityReportDetailsByFacilityReportID(this.route.snapshot.params['facilityreportID'])
      .subscribe( data => {
        this.facilityreportdetails = data;
        this.facilityreportdetails.forEach(element => {

          this.disableUpdate2.push(true);
          let x: FormGroup = this.formBuilder.group({
            facilityreportdetailid: [''],
            facilityreportid: [''],
            employeeid: [this.employeeID],
            comments: null,
            createddate: [''],
            lastmodificationdate: ['']
        })
          x.patchValue(element)
          this.forms.push(x);

          this.employeeService.getEmployee(element.employeeid).subscribe( data => {
            element.username = data.firstname;
          });
          
        });
        console.log("comment: is " + this.facilityreportdetails[0].comments);
        console.log("date: is " + this.facilityreportdetails[0].createddate);
      });

      

  }
  onChangeUpdate(i){
    this.disableUpdate2[i] = !this.disableUpdate2[i];
    console.log("disabled: " + i + ":"+ this.disableUpdate2[i]);
    //location.reload();
  }


  onChange() {
    this.hide = !this.hide;
  }

  onSubmit(): void {
    this.facilityReportDetailService.createFacilityReportDetail(this.form.value)
        .pipe(first())
        .subscribe(() => {
            location.reload();
        });           
    console.warn('Your info has been updated', this.form.value);
}


onChangex(i) {
  this.forms[i].patchValue({
    lastmodificationdate: Date.now(), 
    // formControlName2: myValue2 (can be omitted)
  });
  
  this.facilityReportDetailService.updateFacilityReportDetail(this.forms[i].value)
      .pipe(first())
      .subscribe(() => {
        console.log("update status");
         location.reload();
      });           
 
}
  
}


