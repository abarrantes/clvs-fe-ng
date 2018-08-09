import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  constructor(private userService: UserService) { }

  theUser: any = {}
  signupErrorMessage: any = {}
  loginErrorMessage: any = {}

  loginForm:Boolean = true;
  signupForm:Boolean = false;

  ngOnInit() {
    this.getUsers()
    this.userService.theUserEmitter.subscribe(res => { this.theUser = res })
    this.userService.signupErrorMessageEmitter.subscribe(res => { this.signupErrorMessage = res })
    this.userService.loginErrorMessageEmitter.subscribe(res => { this.loginErrorMessage = res })
  }


  ////////////////////// SIGNUP FORM /////////////////////////////

  signUpInfo: any = {};

  signup() {
    this.userService.signup(this.signUpInfo)
    this.signUpInfo = {};
  }

  switchToLoginForm(){
    this.loginForm = true;
    this.signupForm = false;
  }










  ////////////////////// END SIGNUP FORM /////////////////////////////



  ////////////////////// LOGIN FORM /////////////////////////////

  loginInfo: any = {}

  login() {
    this.userService.login(this.loginInfo)
    this.loginInfo = {}
  }

  switchToSignupForm(){
    this.loginForm = false;
    this.signupForm = true;
  }
















  ////////////////////// END LOGIN FORM /////////////////////////////


  ////////////////////// DISPLAY USERS /////////////////////////////

  //this is where I load the users to display them in a list
  users: any[];

  getUsers() {
    this.userService.getUsersFromDb()
      .subscribe((usersFromDb) => {
        this.users = usersFromDb
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





  ////////////////////// END DISPLAY USERS /////////////////////////////

}


