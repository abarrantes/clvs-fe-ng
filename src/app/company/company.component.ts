import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  companyToBeCreated: any = {
    nombre: "nombre desde angular",
    identificacion: {
      tipo: "a",
      numero: 5,
    }
  }

  companies: Array<any>;

  createCompany() {
    console.log('======================> createCompany() reached')
    this.companyService.createCompanyInDb(this.companyToBeCreated)
      .subscribe((responseFromDb) => {
        console.log(responseFromDb)
        this.getCompanies();
      })
  }

  getCompanies() {
    this.companyService.getCompaniesFromDb()
      .subscribe((companiesFromDb) => {
        this.companies = companiesFromDb
      })
  }

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.getCompanies();
  }

}
