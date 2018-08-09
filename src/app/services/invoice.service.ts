import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'; //this is needed for the .map method
import 'rxjs/add/operator/map';
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: Http) { }

  getInvoicesFromDb() {
    return this.http.get(`${environment.apiBase}/api/invoices/`, { withCredentials: true })
      .map((res) => res.json());
  }

  createInvoiceInDb(invoiceToBeCreated) {
    return this.http.post(`${environment.apiBase}/api/invoices/create`, invoiceToBeCreated, { withCredentials: true })
      .map(res => res.json())
  }

}
