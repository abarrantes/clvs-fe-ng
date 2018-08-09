import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  constructor(private invoiceService: InvoiceService, private userService: UserService) { }

  theUser: any = {}

  createInvoiceForm: Boolean = false;
  invoiceList: Boolean = true;

  ngOnInit() {
    this.userService.theUserEmitter.subscribe(res => { this.theUser = res })
    this.getInvoices()
  }


  ////////////////////// INVOICE LIST /////////////////////////////
  invoices: Array<any>;

  getInvoices() {
    this.invoiceService.getInvoicesFromDb()
      .subscribe((invoicesFromDb) => {
        this.invoices = invoicesFromDb
      })
  }


  switchToCreateInvoiceForm() {
    this.createInvoiceForm = true;
    this.invoiceList = false;
  }











  ////////////////////// END INVOICE LIST /////////////////////////////


  ////////////////////// CREATE INVOICE FORM /////////////////////////////

  invoiceToBeCreated: any =
    {
      invoiceNumber: 0,
      identificacion: "",
      nombre: "",
      lines: [{ itemCode: "I002", itemName: "TEST", itemQuantity: 1, itemPrice: 10, lineTotal: 10 }],
      total: 0,
    }

  createInvoiceErrorMessage: String = "";

  createInvoice() {
    console.log("reached create invoice in component")
    console.log(this.invoiceToBeCreated)
    this.invoiceService.createInvoiceInDb(this.invoiceToBeCreated)
      .toPromise()
      .then((res) => {
        this.getInvoices();
        this.createInvoiceErrorMessage = "";
        this.switchToInvoiceList()
      })
      .catch(err => {
        this.createInvoiceErrorMessage = err.json().message;
      })
    this.invoiceToBeCreated =
    {
      invoiceNumber: 0,
      identificacion: "",
      nombre: "",
      lines: [{ itemCode: "I002", itemName: "TEST", itemQuantity: 1, itemPrice: 10, lineTotal: 10 }],
      total: 0,
    }
    this.switchToInvoiceList()
  }

  switchToInvoiceList() {
    this.createInvoiceForm = false;
    this.invoiceList = true;
  }



  ////////////////////// END CREATE INVOICE FORM /////////////////////////////



}
;