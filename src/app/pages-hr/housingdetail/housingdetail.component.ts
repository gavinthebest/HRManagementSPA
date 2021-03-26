import { Component, OnInit } from '@angular/core';
import { HouseService } from 'app/services/house.service';
import { house } from 'app/models/house';
import { Router, ActivatedRoute } from '@angular/router';
import { FacilityService } from 'app/services/facility.service';
import { facility } from 'app/models/facility';
import { EmployeeService } from 'app/services/employee.service';
import { employee } from 'app/models/employee';

@Component({
  selector: 'app-housingdetail',
  templateUrl: './housingdetail.component.html',
  styleUrls: ['./housingdetail.component.css']
  
})
export class HousingdetailComponent implements OnInit {

  house : house;
  facility: facility;
  employees: employee[];
  
  constructor(private housingservice : HouseService, private facilityservice : FacilityService, private employeeservice : EmployeeService,private route: ActivatedRoute){}   

  ngOnInit() {

      this.housingservice.getHouse(this.route.snapshot.params['houseID'])
        .subscribe( data => {
          this.house = data;
        });
   
      this.facilityservice.getFacilitiesByHouseID(this.route.snapshot.params['houseID'])
        .subscribe( data => {
          this.facility = data;
        });
    
      this.facilityservice.getFacilitiesByHouseID(this.route.snapshot.params['houseID'])
        .subscribe( data => {
          this.facility = data;
        });

        this.employeeservice.getEmployeesByHouseID(this.route.snapshot.params['houseID'])
        .subscribe( data => {
          this.employees = data;
        });
        
}
}