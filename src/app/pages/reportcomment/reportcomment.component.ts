import { Component, OnInit } from '@angular/core';
import { facilityReport } from 'app/models/facilityReport';
import { FacilityReportService } from 'app/services/facility-report.service';
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
  
  hide = true;

  constructor(private facilityreportservice : FacilityReportService,
              private facilityReportDetailService: FacilityReportDetailService,
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
      createdate: [''],
      lastmodificationdate: ['']
  });

    this.facilityreportservice.getFacilityReport(this.route.snapshot.params['facilityreportID'])
        .subscribe( data => {
          this.facilityreport = data;
        });


    //find facility report detail by facility report id
    this.facilityReportDetailService.getFacilityReportDetailsByFacilityReportID(this.route.snapshot.params['facilityreportID'])
      .subscribe( data => {
        this.facilityreportdetails = data;
        console.log("comment: is " + this.facilityreportdetails[0].comments);
        console.log("date: is " + this.facilityreportdetails[0].createddate);
      });


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
  
}


