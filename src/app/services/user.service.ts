import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'; //this is needed for the .map method
import 'rxjs/add/operator/map';
import { environment } from "../../environments/environment";

import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})

//I am going to split this service in two, 
//1. functionality to be shared globally
//2. functionality specific to the user component

export class UserService {

  theUser = new BehaviorSubject('Eric');

  constructor(private http: Http) { }

  loginFormShowing = new BehaviorSubject(false)

  toggleLogin(){
   this.loginFormShowing.next(!this.loginFormShowing.getValue())
   console.log(this.loginFormShowing.getValue())
  }

  //1. functionality to be shared globally

  checkLogin() {
    return this.http.get(`${environment.apiBase}/api/auth/loggedin`, { withCredentials: true })
      // .map(res => res.json())
      .toPromise()
      .then((res) => {
        this.theUser.next(res.json());
        console.log("======== response from checklogin: ", res.json());
      })
      .catch((err) => {
        this.theUser.next(null)
        console.log("======== error from checkLogin: ", err)
      })
  }

  logout() {
    return this.http.post(`${environment.apiBase}/api/auth/logout`, {}, { withCredentials: true })
      // .map(res => res.json())
      .toPromise()
      .then((res) => {
        this.theUser.next(null)
        console.log("======== response from logout: ", res);
      })
      .catch((err) => {
        console.log("======== error from logout: ", err)
      })
  }


  //2. functionality specific to the user component

  getUsersFromDb() {
    return this.http.get(`${environment.apiBase}/api/auth/`, { withCredentials: true })
      .map(res => res.json())
  }

  signup(credentials) {
    return this.http.post(`${environment.apiBase}/api/auth/signup`, credentials, { withCredentials: true })
      .subscribe(res => { this.theUser.next(res.json()) })
  }

  login(credentials) {
    return this.http.post(`${environment.apiBase}/api/auth/login`, credentials, { withCredentials: true })
      .subscribe(res => { this.theUser.next(res.json()) })
  }

  toggleUserStatus(id) {
    return this.http.put(`${environment.apiBase}/api/auth/changeStatus/${id}`, {}, { withCredentials: true })
      .map(res => res.json())
  }

}