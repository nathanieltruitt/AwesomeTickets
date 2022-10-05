import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Company } from 'src/app/interfaces/company.interface';
import { dbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  // TODO: once user finishes entering a company name, api call populates list
  showDetail = false;
  searchValue!: string;
  companies$: Observable<Company[]>;

  constructor(private dbService: dbService) {
    this.companies$ = this.dbService.companies$;
  }

  ngOnInit(): void {}

  getTicketList() {
    // look up company ID
    this.dbService.companies$.pipe(
      map((x) =>
        x.filter((company) => company.companyName === this.searchValue)
      )
    );
  }
}
