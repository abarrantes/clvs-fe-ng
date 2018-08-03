import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getUsers()
  }

  //this is where I load the users to display them in a list
  users: any[];

  getUsers() {
    this.userService.getUsersFromDb()
      .subscribe((usersFromDb) => {
        this.users = usersFromDb
      })
  }

  signUpInfo: any = {}; // use it to ngModel link the signup form
  currentUser: any; // this is where I store the response
  signupErrorMessage: String; // I use this to store an error if returned and display the error I get back in the html

  signup() {
    this.userService.signup(this.signUpInfo)
      .toPromise()
      .then((res) => {
        this.currentUser = res;
        this.signUpInfo = {};
        this.signupErrorMessage = ""
        this.getUsers();
        this.router.navigate(['/company']);
      })
      .catch((err) => {
        this.signupErrorMessage = err.json().message;
      })
  }

  loginInfo: any = {} // use it to ngModel link the signup form
  loginErrorMessage: String;

  login() {
    this.userService.login(this.loginInfo)
      .toPromise()
      .then((res) => {
        this.loginInfo = {};
        this.getUsers();
        this.router.navigate(['/company']);
      })
      .catch((err) => {
        this.loginErrorMessage = err.json().message;
      })
  }

  checkLogin() {
    this.userService.checkLogin()
      .toPromise()
      .then((res) => {
        console.log("==========response: ", res);
      })
      .catch((err) => {
        console.log("========error from checkLogin: ", err)
      })
  }

  logout() {
    this.userService.logout()
      .toPromise()
      .then((res) => {
        console.log("==========response: ", res);
      })
      .catch((err) => {
        console.log("========error from checkLogin: ", err)
      })
  }

  userId: String;

  toggleUserStatus(userId) {
    this.userService.toggleUserStatus(userId)
      .toPromise()
      .then((response) => {
        console.log("================response from toggleUserStatus in user.component: ", response)
        this.getUsers();
      })
      .catch(err => console.log("=====error from toggleUserStatus: ", err))
  }

}


