import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: any[];

  signUpInfo: any = {};
  currentUser: any;
  errorMessage: String;

  loginInfo: any = {}

  signup() {
    this.userService.signup(this.signUpInfo)
      .then((res) => {
        this.currentUser = res;
        this.myRouter.navigate(['/company']);
      })
      .catch((err) => {
        const parsedErr = err.json()
        this.errorMessage = parsedErr.message;
      })
  }

  login() {
    this.userService.login(this.loginInfo)
      .then((res) => {
        this.loginInfo = {};
        this.myRouter.navigate(['/company']);
      })
      .catch((err) => {
        const parsedErr = err.json()
        this.errorMessage = parsedErr.message;
      })
  }

  constructor(private userService: UserService,
    private myRouter: Router) { }

  ngOnInit() {
    this.userService.getUsersFromDb()
      .subscribe((usersFromDb) => {
        this.users = usersFromDb
      })
  }
}

