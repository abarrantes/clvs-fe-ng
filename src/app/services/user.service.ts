import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'; //this is needed for the .map method
import 'rxjs/add/operator/map';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: Http) { }

  getUsersFromDb() {
    return this.http.get(`${environment.apiBase}/api/auth/`, { withCredentials: true })
      .map(res => res.json())
  }

  signup(credentials) {
    return this.http.post(`${environment.apiBase}/api/auth/signup`, credentials, { withCredentials: true })
      .map(res => res.json())
  }

  login(credentials) {
    return this.http.post(`${environment.apiBase}/api/auth/login`, credentials, { withCredentials: true })
      .map(res => res.json())
  }

  checkLogin() {
    return this.http.get(`${environment.apiBase}/api/auth/loggedin`, { withCredentials: true })
      .map(res => res.json())
  }

  logout() {
    return this.http.post(`${environment.apiBase}/api/auth/logout`, {}, { withCredentials: true })
      .map(res => res.json())
  }

  toggleUserStatus(id) {
    return this.http.put(`${environment.apiBase}/api/auth/changeStatus/${id}`, {}, { withCredentials: true })
      .map(res => res.json())
  }

}//fin de clase