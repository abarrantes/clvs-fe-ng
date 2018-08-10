import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { UserService } from '../services/user.service';
import { CustomerService } from '../services/customer.service';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  constructor(
    private invoiceService: InvoiceService,
    private userService: UserService,
    private customerService: CustomerService,
    private itemService: ItemService) { }

  theUser: any = {}

  createInvoiceForm: Boolean = false;
  invoiceList: Boolean = true;

  ngOnInit() {
    this.userService.theUserEmitter.subscribe(res => { this.theUser = res })
    this.getInvoices()
    this.getCustomers()
    this.getItems()
  }

  /////////////////// TRAER LOS CUSTOMERS  ITEMS//////////////////

  customers: Array<any>;

  getCustomers() {
    console.log("inside getcustomers")
    this.customerService.getCustomersFromDb(this.theUser.activeComp)
      .subscribe((customersFromDb) => {
        this.customers = customersFromDb
      })
  }

  items: Array<any>;

  getItems() {
    console.log("inside getitems")
    this.itemService.getItemsFromDb()
      .subscribe((itemsFromDb) => {
        this.items = itemsFromDb
      })
  }


  ///////////////////////END TRAER LOS CUSTOMERS Y ITEMS //////////////

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
      // invoiceNumber: 0,
      // identificacion: "",
      nombre: "",
      total: 0,
      lines: [{ itemName: "", itemQuantity: 1, itemPrice: 0, lineTotal: 0 }],
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
        // invoiceNumber: 0,
        // identificacion: "",
        nombre: "",
        total: 0,
        lines: [{ itemName: "", itemQuantity: 1, itemPrice: 0, lineTotal: 0 }],
      }
    this.switchToInvoiceList()
  }

  pushLineIntoLines() {
    this.invoiceToBeCreated.lines.push(
      { itemName: "", itemQuantity: 1, itemPrice: 0, lineTotal: 0 }
    )
  }

  calcTotals() {
    this.invoiceToBeCreated.lines.forEach(line => {
      line.lineTotal = line.itemPrice * line.itemQuantity
    });
    this.calcDocTotal()
  }

  calcDocTotal(){
    this.invoiceToBeCreated.lines.forEach(line => {
      this.invoiceToBeCreated.total += line.lineTotal
    });
  }


  switchToInvoiceList() {
    this.createInvoiceForm = false;
    this.invoiceList = true;
  }



  ////////////////////// END CREATE INVOICE FORM /////////////////////////////



}
;