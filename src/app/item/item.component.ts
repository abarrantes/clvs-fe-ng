import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit {

  constructor(private itemService: ItemService, private userService: UserService) { }

  theUser: any = {}

  createItemForm: Boolean = false;
  itemList: Boolean = true;

  ngOnInit() {
    this.userService.theUserEmitter.subscribe(res => { this.theUser = res })
    this.getItems()
  }

  ////////////////////// ITEM LIST /////////////////////////////
  items: Array<any>;

  getItems() {
    this.itemService.getItemsFromDb()
      .subscribe((itemsFromDb) => {
        this.items = itemsFromDb
      })
  }

  toggleItemStatus(id) {
    this.itemService.changeItemStatusInDb(id)
      .toPromise()
      .then((res) => {
        this.getItems();
      })
      .catch(err => console.log("=====error from toggleItemStatus: ", err))
  }

  switchToCreateItemForm() {
    this.createItemForm = true;
    this.itemList = false;
  }



  ////////////////////// END ITEM LIST /////////////////////////////


  ////////////////////// CREATE ITEM FORM /////////////////////////////
  itemToBeCreated: any = {}
  createItemErrorMessage: String = "";

  createItem() {
    this.itemService.createItemInDb(this.itemToBeCreated)
      .toPromise()
      .then((res) => {
        this.getItems();
        this.createItemErrorMessage = "";
        this.switchToItemList()
      })
      .catch(err => {
        this.createItemErrorMessage = err.json().message;
      })
    this.itemToBeCreated = {}
  }


  switchToItemList() {
    this.createItemForm = false;
    this.itemList = true;
  }




  ////////////////////// CREATE ITEM FORM /////////////////////////////

}
