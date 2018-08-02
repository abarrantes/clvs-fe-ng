import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers: Array<any>;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getItemsFromDb()
      .subscribe((customersFromDb) => {
        this.customers = customersFromDb
      })
  }
}
