import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  items: any[]

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getItemsFromDb()
      .subscribe((itemsFromDb) => {
        this.items = itemsFromDb
      })
  }
}