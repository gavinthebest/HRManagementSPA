import { Component, OnInit } from '@angular/core';
import { registrationtoken } from 'app/models/registrationtoken';
import { RegistrationtokenService } from '../../services/registrationtoken.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  registrationtokens! : registrationtoken[];

  constructor(private employeeService : RegistrationtokenService) { }

  ngOnInit(): void {
    this.listEmployees();
  }
  
  listEmployees(): void {
    this.employeeService.getRegistrationtokens()
      .subscribe(
        registrationtokens => {
          this.registrationtokens = registrationtokens;
          console.log(registrationtokens);
        },
        error => {
          console.log(error);
        });
  }

}
