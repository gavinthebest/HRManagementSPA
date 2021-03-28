import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {CookieService} from 'ngx-cookie-service';
import {VisitorService} from '../../services/visitor.service';
import {visitor} from '../../models/visitor';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  visitor: visitor;
  disabled: boolean;
  constructor(private userService: UserService,
              private cookieService: CookieService,
              private router: Router,
              private visitorService: VisitorService) {
  }

  ngOnInit(): void {
    this.disabled = false;
  }


  loginAttempt() {
    this.disabled = true;
    this.router.navigate(['logout'], {skipLocationChange: true});
    if (!this.username || !this.password){
      alert('Please enter all fields');
      this.disabled = false;
    } else {
      this.userService.getUserByUsername(this.username).subscribe(user => {
        if (user != null) {
          if (user.password === this.password) {
            this.cookieService.set('username', user.username);
            this.cookieService.set('userID', String(user.userID));
            this.cookieService.set('token', user.username + ' is a token');
            this.cookieService.set('email', user.email);
            this.visitor = {
              username: user.username, userID: user.userID,
              token: user.username + ' is a token', visitorID: null
            };
            this.visitorService.deleteVisitorByUsername(user.username).subscribe();
            this.visitorService.createVisitor(this.visitor).subscribe();
            alert('Login Success');
            this.router.navigate(['/']);
          } else {
            alert('Login failed, please check your password.');
            this.disabled = false;
          }
        } else {
          alert('Login failed, no such user found.');
          this.disabled = false;
        }
      });
    }
  }
}
