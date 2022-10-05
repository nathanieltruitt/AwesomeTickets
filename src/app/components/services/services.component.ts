import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Company } from 'src/app/interfaces/company.interface';
import { Ticket } from 'src/app/interfaces/ticket.interface';
import { dbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  // TODO: once user finishes entering a company name, api call populates list
  showDetail = false;
  selectedDetail!: number;
  searchValue!: string;

  constructor(private dbService: dbService) {}

  ngOnInit(): void {}

  getCompanies() {
    return this.dbService.companies$;
  }

  getTickets() {
    return this.dbService.tickets$;
  }

  searchTickets() {
    this.dbService.getTicketList(this.searchValue);
  }

  switchDetails(event: any) {
    this.selectedDetail = Number(
      event.originalTarget.parentElement.parentElement.children[1].innerText
    );
    this.showDetail = !this.showDetail;
  }
}
