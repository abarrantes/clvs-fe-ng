import { Injectable } from '@angular/core';
import { Http } from '../../../node_modules/@angular/http';
import { Observable } from 'rxjs/Observable'; //this is needed for the .map method
import 'rxjs/add/operator/map';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class CompanyService {

  constructor(private http: Http) { }

  getCompaniesFromDb() {
    return this.http.get(`${environment.apiBase}/api/comps/`)
      .map((res) => res.json());
  }

  createCompanyInDb(companyToBeCreated) {
    return this.http.post(`${environment.apiBase}/api/comps/create`, companyToBeCreated, { withCredentials: true })
      .map((res) => res.json());
  }

  changeCompanyStatusInDb(id) {
    return this.http.put(`${environment.apiBase}/api/comps/changeStatus/${id}`, {}, { withCredentials: true })
      .map((res) => res.json());
  }

}
