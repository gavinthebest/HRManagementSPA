import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {user} from '../../models/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  tokenValidated = false;
  token: string;
  username = '';
  password = '';
  password2 = '';
  user: user;
  users!: user[];
  email: string;
  thisDate: Date;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
  }

  validate(): void {
    this.tokenValidated = true;
    console.log(this.token);
  }
  registerAttempt(): void {
    this.thisDate = new Date();
    if (this.checkNamePass()) {
      this.user = {userID: null, username: this.username,
        password: this.password, email: this.email, createDate: this.thisDate, modificationDate: this.thisDate};
      this.userService.createUser(this.user).subscribe();
    } else {
      console.log('username taken');
    }
  }
  checkNamePass(): boolean {
    // TODO: getByUsername
    if (this.password === this.password2) {
      return true;
    } else {
      return false;
    }
  }

}
