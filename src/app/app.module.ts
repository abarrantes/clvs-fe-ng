import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { Routes, RouterModule } from "@angular/router";

import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { ItemService } from './services/item.service';
import { ItemComponent } from './item/item.component';

import { CustomerService } from './services/customer.service';
import { CustomerComponent } from './customer/customer.component';

import { CompanyService } from './services/company.service';
import { CompanyComponent } from './company/company.component';

import { UserService } from './services/user.service';
import { UserComponent } from './user/user.component';

const routes:Routes = [
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'company',
    component: CompanyComponent
  },
  {
    path: 'customer',
    component: CustomerComponent
  },
  {
    path: 'item',
    component: CustomerComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    CustomerComponent,
    CompanyComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ItemService,CustomerService,CompanyService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
