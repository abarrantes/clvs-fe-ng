import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'; //this is needed for the .map method
import 'rxjs/add/operator/map';
import { environment } from "../../environments/environment";

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

//I am going to split this service in two, 
//1. functionality to be shared globally
//2. functionality specific to the user component

export class UserService {

  theUserEmitter = new BehaviorSubject(null);

  constructor(private http: Http, private router: Router) { }


  ////////////////////// SIGNUP FORM /////////////////////////////

  signupErrorMessageEmitter = new BehaviorSubject(null);

  signup(credentials) {
    console.log(credentials)
    return this.http.post(`${environment.apiBase}/api/auth/signup`, credentials, { withCredentials: true })
      .subscribe(
        res => {
          this.theUserEmitter.next(res.json())
          this.signupErrorMessageEmitter.next(null)
          this.router.navigate(['/']);
        },
        err => {
          this.signupErrorMessageEmitter.next(JSON.parse(err._body).message)
        }
      )
  }









  ////////////////////// END SIGNUP FORM /////////////////////////////


  ////////////////////// LOGIN FORM /////////////////////////////
  loginErrorMessageEmitter = new BehaviorSubject(null);

  login(credentials) {
    return this.http.post(`${environment.apiBase}/api/auth/login`, credentials, { withCredentials: true })
      .subscribe(
        res => {
          this.theUserEmitter.next(res.json())
          this.loginErrorMessageEmitter.next(null)
          this.router.navigate(['/']);
        },
        err => {
          this.loginErrorMessageEmitter.next(JSON.parse(err._body).message)
        }
      )
  }










  ////////////////////// END LOGIN FORM /////////////////////////////


  ////////////////////// USER MANAGEMENT /////////////////////////////

  getUsersFromDb() {
    return this.http.get(`${environment.apiBase}/api/auth/`, { withCredentials: true })
      .map(res => res.json())
  }



  toggleUserStatus(id) {
    return this.http.put(`${environment.apiBase}/api/auth/changeStatus/${id}`, {}, { withCredentials: true })
      .map(res => res.json())
  }













  ////////////////////// END USER MANAGEMENT /////////////////////////////

  ////////////////////// USER SERVICE UTILITIES /////////////////////////////

  checkLogin() {
    return this.http.get(`${environment.apiBase}/api/auth/loggedin`, { withCredentials: true })
      .toPromise()
      .then((res) => {
        this.theUserEmitter.next(res.json());
        console.log("======== response from checklogin: ", res.json());
      })
      .catch((err) => {
        this.theUserEmitter.next(null)
        console.log("======== error from checkLogin: ", err)
      })
  }

  logout() {
    return this.http.post(`${environment.apiBase}/api/auth/logout`, {}, { withCredentials: true })
      .toPromise()
      .then((res) => {
        this.theUserEmitter.next(null)
        console.log("======== response from logout: ", res);
      })
      .catch((err) => {
        console.log("======== error from logout: ", err)
      })
  }

  ////////////////////// END USER SERVICE UTILITIES /////////////////////////////

}