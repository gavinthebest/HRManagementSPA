import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from 'app/services/employee.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { employee } from 'app/models/employee';
import { VisaStatusService } from "app/services/visa-status.service";
import { visaStatus } from "app/models/visaStatus";

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}


@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit{

    employee: any;
    users!: employee[];
    visaStatus!:visaStatus[];
    // visaStat:visaStatus;
    
    currEmployId:number;
    currEmployee:employee = null;
    // picUrl:string = null;
    expand_employeeId:number;

    picUrl:string = "https://www.exoffender.org/wp-content/uploads/2016/09/empty-profile.png";
    todayDate = new Date();

    constructor(
        private employeeService: EmployeeService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private visaStatusService: VisaStatusService
        // private httpClient: HttpClient
        ) {}
   
    ngOnInit(){
        this.employeeService.getEmployees()
        .pipe(first())
        .subscribe(users => this.users = users);


        // this.visaStatusService.getVisaStatusByEmployeeID(this.route.snapshot.params['employeeID'])
        // .pipe(first())
        // .subscribe( data=>{
        //     this.visaStat = data;
        // });

        this.visaStatusService.getAllVisaStatus()
        .pipe(first())
        .subscribe(visaStatus=>this.visaStatus = visaStatus);
    }

    setCurrEmployId(e){
        // alert(e);
        this.currEmployId = e;

    }

    setCurrEmployee(e){
        this.currEmployee = e;
        // this.picUrl = "https://www.exoffender.org/wp-content/uploads/2016/09/empty-profile.png";
        this.picUrl = "";

    }

    // resetPicUrl(){
    //     this.picUrl = "https://www.exoffender.org/wp-content/uploads/2016/09/empty-profile.png";
    // }

    setPicUrl1(){
        this.picUrl = "https://www.usimmigration.us/assets/images/form-product-hero/i765-product-hero-315e43e7.png";
    }

    setPicUrl2(){
        this.picUrl = "https://images.financialexpress.com/2021/01/h1b-pti-1.jpg";
    }

    setPicUrl3(){
        this.picUrl = "https://www.paydaypayroll.com/wp-content/uploads/2019/11/Restricted-SS-Card.jpg"
    }

    trExpand(e){
        this.expand_employeeId = e;
        // this.visaStatusService.getVisaStatusByEmployeeID(1));
    }
    
}
