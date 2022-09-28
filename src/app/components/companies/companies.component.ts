import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent implements OnInit {
  showDetails = false;
  selectedDetail!: number;
  list = [
    {
      'Company ID': '1',
      company: 'Derpy Co.',
      contact: 'John Cena',
      'Number of Tickets': '20',
      assigned: 'Michael Scott',
      Phone: '2707097871',
    },
    {
      'Company ID': '2',
      company: 'Derpy Co.',
      contact: 'John Cena',
      'Number of Tickets': '20',
      assigned: 'Michael Scott',
      Phone: '2707097871',
    },
    {
      'Company ID': '3',
      company: 'Derpy Co.',
      contact: 'John Cena',
      'Number of Tickets': '20',
      assigned: 'Michael Scott',
      Phone: '2707097871',
    },
    {
      'Company ID': '4',
      company: 'Derpy Co.',
      contact: 'John Cena',
      'Number of Tickets': '20',
      assigned: 'Michael Scott',
      Phone: '2707097871',
    },
  ];
  constructor() {}

  ngOnInit(): void {}

  switchDetails(event: any) {
    this.selectedDetail = Number(
      event.originalTarget.parentElement.parentElement.children[1].innerText
    );
    this.showDetails = !this.showDetails;
  }
}
