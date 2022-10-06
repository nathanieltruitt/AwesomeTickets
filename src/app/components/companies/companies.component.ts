import { Component, OnInit } from '@angular/core';
import { dbService } from 'src/app/services/db.service';
import { Company } from 'src/app/interfaces/company.interface';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent implements OnInit {
  // TODO: new component for company-search
  // TODO: company dashboard shows how many companies
  // TODO: statuses list per company
  showDetails = false;
  selectedDetail!: number | null;
  isCompany!: boolean;
  show = false;

  constructor(private dbService: dbService) {}

  ngOnInit(): void {
    //  ? move this into list component
  }

  switchDetails(event: any) {
    this.selectedDetail = Number(
      event.originalTarget.parentElement.parentElement.children[1].innerText
    );
    this.isCompany =
      event.originalTarget.parentElement.parentElement.children[1].offsetParent
        .id === 'Company'
        ? true
        : false;
    this.showDetails = !this.showDetails;
  }

  addCompanyOrContact(entity: 'Company' | 'Contact') {
    // set selected detail to null so that we do not poll for data
    if (entity === 'Company') this.isCompany = true;
    else this.isCompany = false;
    this.selectedDetail = null;
    this.showDetails = !this.showDetails;
    this.show = !this.show;
  }

  getCompanies() {
    return this.dbService.companies$
      .pipe(
        tap((companies) =>
          companies.forEach((company) => delete company.address)
        ),
        map((companies: Company[]) =>
          companies.sort(this.dbService.sortList())
        ),
        map((companies) => companies.map((company) => Object.values(company)))
      )
      .subscribe((x) => console.log(x));
  }
}
