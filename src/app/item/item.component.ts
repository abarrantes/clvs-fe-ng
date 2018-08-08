import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit {
  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getItems()
  }

  //this is where I load the items to display them in a list
  items: Array<any>;

  getItems() {
    this.itemService.getItemsFromDb()
      .subscribe((itemsFromDb) => {
        this.items = itemsFromDb
      })
  }

  itemToBeCreated: any = {}

  createItemErrorMessage: String = "";

  //question: if I try to create a second item I cant because itemToBeCreated is empty {}
  createItem() {
    this.itemService.createItemInDb(this.itemToBeCreated)
      .toPromise()
      .then((res) => {
        this.getItems();
        this.createItemErrorMessage = "";
      })
      .catch(err => {
        this.createItemErrorMessage = err.json().message;
      })
    this.itemToBeCreated = {}
  }

  toggleItemStatus(id) {
    this.itemService.changeItemStatusInDb(id)
      .toPromise()
      .then((res) => {
        this.getItems();
      })
      .catch(err => console.log("=====error from toggleItemStatus: ", err))
  }
}
