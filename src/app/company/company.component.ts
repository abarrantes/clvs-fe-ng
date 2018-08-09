import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})

export class CompanyComponent implements OnInit {

  constructor(private companyService: CompanyService, private userService: UserService) { }

  theUser: any = {}

  createCompForm: Boolean = false;
  compsList: Boolean = true;

  ngOnInit() {
    this.getCompanies()
    this.userService.theUserEmitter.subscribe(res => { this.theUser = res })
  }

  ////////////////////// COMPANIES LIST /////////////////////////////
  companies: Array<any>;

  getCompanies() {
    this.companyService.getCompaniesFromDb()
      .subscribe((companiesFromDb) => {
        this.companies = companiesFromDb
      })
  }



  toggleCompanyStatus(id) {
    this.companyService.changeCompanyStatusInDb(id)
      .toPromise()
      .then((response) => {
        this.getCompanies();
      })
      .catch(err => console.log("=====error from toggleCompanyStatus: ", err))
  }





  ////////////////////// END COMPANIES LIST /////////////////////////////


  ////////////////////// CREATE COMPANY FORM /////////////////////////////

  companyToBeCreated: any = {};

  createCompanyErrorMessage: String = "";

  //question: if I try to create a second customer I cante because customerToBeCreated is empty {}
  createCompany() {
    this.companyService.createCompanyInDb(this.companyToBeCreated)
      .toPromise()
      .then((res) => {
        this.getCompanies();
        this.createCompanyErrorMessage = "";
      })
      .catch((err) => {
        this.createCompanyErrorMessage = err.json().message;
      })
    this.companyToBeCreated = {};
  }



  
  ////////////////////// END CREATE COMPANY FORM /////////////////////////////
}
