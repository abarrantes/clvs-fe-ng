import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'; //this is needed for the .map method
import 'rxjs/add/operator/map';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  constructor(private http: Http) { }

  getCustomersFromDb() {
    return this.http.get(`${environment.apiBase}/api/cust/`, { withCredentials: true })
      .map((res) => res.json());
  }

  createCustomerInDb(customerToBeCreated) {
    return this.http.post(`${environment.apiBase}/api/cust/create`, customerToBeCreated, { withCredentials: true })
      .map(res => res.json())
  }

  changeCustomerStatusInDb(id) {
    return this.http.put(`${environment.apiBase}/api/cust/changeStatus/${id}`, {}, { withCredentials: true })
      .map(res => res.json())
  }

}
