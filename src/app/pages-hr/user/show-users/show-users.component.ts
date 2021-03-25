import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { employee } from 'app/models/employee';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit, DoCheck {
  @Input() users: employee[] = [];
  @Input() search: string;
  @Input() currentUsers!: employee[];
  oldSearch: string = "";
  
  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if (this.search !== this.oldSearch) {
        if (this.search === "") {
            this.currentUsers = this.users;
        } else {
            this.currentUsers = this.users.filter(x => x.employeeID.toString().includes(this.search)
                                                    || x.firstname.toLowerCase().includes(this.search.toLowerCase())
                                                    || x.lastname.toLowerCase().includes(this.search.toLowerCase()));
        }
        this.oldSearch = this.search;
    }
}
}
