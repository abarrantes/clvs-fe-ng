import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})

export class CompanyComponent implements OnInit {

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.getCompanies();
  }

  //this is where I load the companies to display them in a list
  companies: Array<any>;

  getCompanies() {
    this.companyService.getCompaniesFromDb()
      .subscribe((companiesFromDb) => {
        this.companies = companiesFromDb
      })
  }

  companyToBeCreated: any = {
    identificacion: {
      tipo: "",
      numero: null,
    }
  };

  createCompanyErrorMessage: String = "";

  //question: if I try to create a second customer I cante because customerToBeCreated is empty {}
  createCompany() {
    this.companyService.createCompanyInDb(this.companyToBeCreated)
      .toPromise()
      .then((res) => {
        this.companyToBeCreated = {};
        this.createCompanyErrorMessage = "";
        this.getCompanies();
      })
      .catch((err) => {
        this.createCompanyErrorMessage = err.json().message;
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

}
