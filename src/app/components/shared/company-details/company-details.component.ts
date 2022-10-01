import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Company } from 'src/app/interfaces/company.interface';
import { Contact } from 'src/app/interfaces/contact.interface';
import {
  faXmark,
  faTrashCan,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { dbService } from 'src/app/services/db.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css'],
})
export class CompanyDetailsComponent implements OnInit {
  @Input() detailId!: number | null;
  @Output() closeEvent = new EventEmitter();
  companyList!: Company[];
  contactList!: Observable<Contact[]>;
  // contact detail pushes an event with a created contact to company detail. If company detail is not saved company detail discards contact
  // * refer to line 24 within contact-details.component.ts
  createdContact!: number;
  lastCompanyId!: number;
  documentId!: string;
  companyForm!: FormGroup;
  faXmark = faXmark;
  faTrashCan = faTrashCan;
  faTriangleExclamation = faTriangleExclamation;
  showContactForm = false;
  isSaved = false;
  errorMsg!: string;

  constructor(private formBuilder: FormBuilder, private dbService: dbService) {}

  ngOnInit(): void {
    this.contactList = this.dbService.contacts$.pipe(
      map((contacts) =>
        contacts.filter((contact) => contact.company === this.detailId)
      )
    );

    // subscribe to get company list
    this.dbService.companies$.subscribe({
      next: (company) => {
        this.companyList = company;

        // grab the last company Id
        this.lastCompanyId =
          this.companyList.length > 0
            ? this.companyList.sort(this.dbService.sortList())[
                this.companyList.length - 1
              ].id
            : 0;

        if (!this.detailId) {
          // * take the last company ID and add a new company ID to detail ID
          this.detailId = this.lastCompanyId + 1;
        }
      },
    });

    this.companyForm = this.formBuilder.group({
      id: [''],
      companyName: [''],
      primaryContact: [''],
      assigned: [''],
      address: this.formBuilder.group({
        street: [''],
        city: [''],
        zipCode: [''],
      }),
    });
    // TODO: refactor this
    if (this.detailId) {
      this.dbService.getEntity(this.detailId).subscribe((ss: any) => {
        let documents: any;
        ss.docs.forEach((doc: any) => {
          documents = doc.data();
          this.documentId = doc.id;
        });
        this.companyForm.setValue({
          id: documents.id,
          companyName: documents.companyName,
          primaryContact: documents.primaryContact,
          assigned: documents.assigned,
          address: {
            street: documents.address.street,
            city: documents.address.city,
            zipCode: documents.address.zipCode,
          },
        });
      });
      this.isSaved = true;
    }
  }

  closeDetail() {
    if (!this.isSaved) {
      // * delete the created contact since the company is not saved
      // TODO: emit something else, there is no document id
      this.dbService
        .getEntity(this.createdContact, 'Contacts')
        .subscribe((contact) => {
          contact.docs.forEach((doc: any) => {
            this.dbService.deleteEntity('Contacts', doc.id);
          });
        });
      // this.dbService.deleteEntity('Contacts', this.createdContact);
    }
    // * set pending company within database service to null as we are finished with this component
    this.dbService.pendingCompany = null;
    this.closeEvent.emit();
  }

  deleteCompany() {
    this.contactList.subscribe((contacts) => {
      const contactsLength = contacts.filter(
        (contact) => contact.company === this.companyForm.get('id')?.value
      ).length;
      if (contactsLength > 0) {
        this.errorMsg = `Company is associated with ${contactsLength} Contacts.`;
      } else {
        this.dbService.deleteEntity('Companies', this.documentId);
        this.closeDetail();
      }
    });
  }

  saveCompany() {
    this.isSaved = true;
    this.companyForm.patchValue({
      // set to next id number or set to 1 if no companies
      id: this.companyList[this.companyList.length - 1]
        ? this.companyList[this.companyList.length - 1].id + 1
        : 1,
      numberOfTickets: 0,
    });

    this.dbService.updateEntity(
      this.companyForm.value,
      'Companies',
      this.documentId
    );

    // close detail upon saving
    this.closeDetail();
  }

  addContact() {
    this.showContactForm = !this.showContactForm;
    // emit the company name and id to companies component so it is aware there is a pending company
    this.dbService.pendingCompany = {
      name: this.companyForm.get('companyName')?.value,
      id: this.detailId,
    };
  }
}
