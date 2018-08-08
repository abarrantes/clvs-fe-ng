import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

// import { Data } from '../entities/data';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }



  loginForm:Boolean = false;
  signupForm:Boolean = false;

  ngOnInit() {
    this.getUsers()
    this.userService.checkLogin()
  }

  toggleLogin(){
    this.userService.toggleLogin()
  }

  toggleSignup(){
    this.loginForm= false;
    this.signupForm = true;
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
      // .map((res) => {
        // this.currentUser = res;
        // this.signUpInfo = {};
        // this.signupErrorMessage = ""
        this.getUsers();
        this.router.navigate(['/company']);
      // })
      // .catch((err) => {
        // this.signupErrorMessage = err.json().message;
      // })
  }

  loginInfo: any = {} // use it to ngModel link the signup form
  loginErrorMessage: String;

  login() {
    this.userService.login(this.loginInfo)
      // .toPromise()
      // .then((res) => {
        // this.loginInfo = {};
        this.getUsers();
        this.router.navigate(['/company']);
      // })
      // .catch((err) => {
        // this.loginErrorMessage = err.json().message;
      // })
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


