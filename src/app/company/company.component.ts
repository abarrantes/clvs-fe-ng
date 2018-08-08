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
        this.getCompanies();
        this.createCompanyErrorMessage = "";
      })
      .catch((err) => {
        this.createCompanyErrorMessage = err.json().message;
      })
    this.companyToBeCreated = {
      identificacion: {
        tipo: "",
        numero: null,
      }
    }
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
