import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {user} from '../../models/user';
import {registrationtoken} from '../../models/registrationtoken';
import {RegistrationtokenService} from '../../services/registrationtoken.service';

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
  constructor(private userService: UserService, private registrationtokenService: RegistrationtokenService) {}
  ngOnInit(): void {
  }
  validate(form: NgForm): void {
    this.token = form.controls['token'].value;
    console.log(this.token);
    this.registrationtokenService.getRegistrationtokenByToken(this.token).subscribe(reg => {
      this.tokenValidated = (reg != null);
      if (this.tokenValidated){
        this.email = reg.email;
      }
      console.log(reg);
    });
  }
  registerAttempt(): void {
    this.thisDate = new Date();
    this.user = {userID: null, username: this.username,
      password: this.password, email: this.email, createDate: this.thisDate, modificationDate: this.thisDate};
    this.userService.createUser(this.user).subscribe();
  }
  checkNamePass(): void {
    if (this.password === this.password2) {
      this.userService.getUserByUsername(this.username).subscribe(user => {
        if (user == null) {
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
