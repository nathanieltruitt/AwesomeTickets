import {
  Component,
  OnInit,
  Input,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { dbService } from 'src/app/services/db.service';
import { isEntity } from 'src/app/interfaces/entity.interface';
import { Company } from 'src/app/interfaces/company.interface';
import { Contact } from 'src/app/interfaces/contact.interface';
import { Ticket } from 'src/app/interfaces/ticket.interface';
import { Entity } from 'src/app/interfaces/entity.interface';
import { take, map, Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  // TODO: need to be able to implement filtering
  @Input() headers!: string[];
  @Input() entities$!: Observable<Entity[]>;
  @Input() entityType!: 'Companies' | 'Contacts' | 'Tickets';
  // objects to list inside of the table
  rows!: object[];
  @Output() clickDetails = new EventEmitter();
  companyList!: Company[];
  windowWidth!: number;
  page = 1;
  count = 0;
  tableSize = 7;

  constructor(private dbService: dbService) {}

  ngOnInit(): void {
    this.dbService.companies$.subscribe((companies) => {
      this.companyList = companies;
    });

    // ! need to figure out how to make this dynamic
    this.windowWidth = window.innerWidth;
    this.dbService.getEntityType(this.entityType).subscribe({
      next: (data) => {
        data.sort(this.dbService.sortList());
        this.rows = [];
        if (data.length === 0) return;
        this.addList(data);
      },
    });
  }

  getData(entities: Entity[], index: number): object[] {
    return Object.values(entities[index]);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.windowWidth = window.innerWidth;
  }

  getDetails(event: any) {
    this.clickDetails.emit(event);
  }

  addList(data: Company[] | Contact[] | Ticket[]) {
    if (isEntity<Company>(<Company>data[0], 'companyName')) {
      data.forEach((doc: any) => {
        this.rows.push({
          id: doc.id,
          companyName: doc.companyName,
          primaryContact: doc.primaryContact,
          numberOfTickets: doc.numberOfTickets,
          assigned: doc.assigned,
        });
      });
    } else if (isEntity<Contact>(<Contact>data[0], 'firstName')) {
      data.forEach((doc: any) => {
        this.rows.push({
          id: doc.id,
          firstName: doc.firstName,
          lastName: doc.lastName,
          // * check to see if pendingCompany.id === doc.company, if not check companyList
          company:
            this.dbService.pendingCompany?.id === doc.company
              ? this.dbService.pendingCompany?.name
              : this.companyList.filter(
                  (company) => company.id === doc.company
                )[0].companyName,
          title: doc.title,
          cellNumber: doc.cellNumber,
          officeNumber: doc.officeNumber,
        });
      });
    } else if (isEntity<Ticket>(<Ticket>data[0], 'summary')) {
      data.forEach((doc: any) => {
        this.dbService.filterContact(doc.contact).subscribe((contacts) => {
          this.rows.push({
            id: doc.id,
            company: this.companyList.filter(
              (company) => company.id === doc.company
            )[0].companyName,
            contact: `${contacts[0].firstName} + ${contacts[0].lastName}`,
            assigned: doc.assigned,
            time: doc.time,
          });
        });
      });
    }
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
}
