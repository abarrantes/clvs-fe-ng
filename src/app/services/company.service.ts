import { Injectable } from '@angular/core';
import { Http } from '../../../node_modules/@angular/http';
import { Observable } from 'rxjs/Observable'; //this is needed for the .map method
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  getCompaniesFromDb() {
    return this.http.get('http://localhost:3000/api/comps/')
      .map((res) => res.json());
  }

  createCompanyInDb(companyToBeCreated) {
    return this.http.post('http://localhost:3000/api/comps/create',companyToBeCreated)
      .map((res) => res.json());
  }

  constructor(private http:Http) { }
}
