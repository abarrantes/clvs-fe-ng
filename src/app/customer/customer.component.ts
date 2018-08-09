import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {

  constructor(private customerService: CustomerService, private userService: UserService) { }

  theUser: any = {}

  createCustForm: Boolean = false;
  custList: Boolean = true;

  ngOnInit() {
    this.userService.theUserEmitter.subscribe(res => { this.theUser = res })
    this.getCustomers();
  }

  ////////////////////// CUSTOMER LIST /////////////////////////////
  customers: Array<any>;

  getCustomers() {
    this.customerService.getCustomersFromDb(this.theUser.activeComp)
      .subscribe((customersFromDb) => {
        this.customers = customersFromDb
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

  switchToCreateCustForm() {
    this.createCustForm = true;
    this.custList = false;
  }

  switchToCustList() {
    this.createCustForm = false;
    this.custList = true;
  }

  ////////////////////// END CUSTOMER LIST /////////////////////////////

  
  ////////////////////// CREATE CUSTOMER FORM /////////////////////////////

  customerToBeCreated: any = {};
  createCustomerErrorMessage: String = "";

  createCustomer() {
    this.customerService.createCustomerInDb(this.customerToBeCreated)
      .toPromise()
      .then((res) => {
        this.getCustomers();
        this.createCustomerErrorMessage = "";
        this.switchToCustList()
      })
      .catch(err => {
        this.createCustomerErrorMessage = err.json().message;
      })
    this.customerToBeCreated = {}
  }











  ////////////////////// END CREATE CUSTOMER FORM /////////////////////////////

}
