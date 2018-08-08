import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'; //this is needed for the .map method
import 'rxjs/add/operator/map';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class ItemService {

  constructor(private http: Http) { }

  getItemsFromDb() {
    return this.http.get(`${environment.apiBase}/api/items/`, { withCredentials: true })
      .map((res) => res.json());
  }

  createItemInDb(itemToBeCreated) {
    return this.http.post(`${environment.apiBase}/api/items/create`, itemToBeCreated, { withCredentials: true })
      .map(res => res.json())
  }

  changeItemStatusInDb(id) {
    return this.http.put(`${environment.apiBase}/api/items/changeStatus/${id}`, {}, { withCredentials: true })
      .map(res => res.json())
  }

}