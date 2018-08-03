import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getCustomers();
  }

  //this is where I load the cutomers to display them in a list
  customers: Array<any>;

  getCustomers() {
    this.customerService.getCustomersFromDb()
      .subscribe((customersFromDb) => {
        this.customers = customersFromDb
      })
  }

  customerToBeCreated: any = {
    identificacion: {
      tipo: "",
      numero: null,
    }
  };

  createCustomerErrorMessage: String = "";

  //question: if I try to create a second customer I cante because customerToBeCreated is empty {}
  createCustomer() {
    this.customerService.createCustomerInDb(this.customerToBeCreated)
      .toPromise()
      .then((res) => {
        this.customerToBeCreated = {};
        this.createCustomerErrorMessage = "";
        this.getCustomers();
      })
      .catch(err => {
        this.createCustomerErrorMessage = err.json().message;
      })
  }

  toggleCustomerStatus(id) {
    this.customerService.changeCustomerStatusInDb(id)
      .toPromise()
      .then((res) => {
        this.getCustomers();
      })
      .catch(err => console.log("=====error from toggleCustomerStatus: ", err))
  }
}
