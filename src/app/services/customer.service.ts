import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'; //this is needed for the .map method
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  getItemsFromDb() {
    return this.http.get('http://localhost:3000/api/cust/')
      .map((res) => res.json());
  }

  constructor(private http:Http) { }
}
