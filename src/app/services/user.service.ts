import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from "../../environments/environment";

import { Observable } from 'rxjs/Observable'; //this is needed for the .map method
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http) { }

  getUsersFromDb() {
    return this.http.get(`${environment.apiBase}/api/users/`)
      .map((res) => res.json());
  }

  signup(data) {
    return this.http.post(`${environment.apiBase}/api/signup`,
      {
        signUpUsername: data.username,
        signUpPassword: data.password
      },
      {
        withCredentials: true
      }
    )
      .toPromise()
      .then(res => res.json())
  }


  login(dataToSend) {
    return this.http.post(`${environment.apiBase}/api/login`,
      {
        loginUsername: dataToSend.username,
        loginPassword: dataToSend.password
      },
      {
        withCredentials: true
      }
    )
      .toPromise()
      .then(res => res.json())
  }


  checklogin() {
    return (
      this.http
        .get(
          `${environment.apiBase}/api/checklogin`,

          // Send the cookies across domains
          { withCredentials: true }
        )

        // Convert from observable to promise
        .toPromise()

        // Parse the JSON
        .then(res => res.json())
    );
  } // close checklogin()
  logout() {
    return (
      this.http
        .post(
          `${environment.apiBase}/api/logout`,

          // Nothing to send to the back end (req.body)
          {},

          // Send the cookies across domains
          { withCredentials: true }
        )

        // Convert from observable to promise
        .toPromise()

        // Parse the JSON
        .then(res => res.json())
    );
  } // close logout()
  getAllUsers() {
    return this.http.get(`${environment.apiBase}/api/list-users`, { withCredentials: true })
      .map(res => res.json())
  }

}