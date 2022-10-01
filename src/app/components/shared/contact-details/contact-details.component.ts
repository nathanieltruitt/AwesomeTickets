import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { faXmark, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Contact } from 'src/app/interfaces/contact.interface';
import { Company } from 'src/app/interfaces/company.interface';
import { dbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
})
export class ContactDetailsComponent implements OnInit {
  @Input() detailId!: number | null;
  @Input() isNewCompany = false;
  @Input() companyName!: string;
  @Input() lastCompanyId!: number;
  @Output() closeEvent = new EventEmitter();
  // contactCreated Output exists for if the contact is created inside of a company detail that doesn't exist yet.
  // contact detail component will issue an event up to the company detail stating there is an associated contact linked.
  // if the company is then not created the company detail component will dispose of the contact.
  // * refer to the createdContact property on line 21 on company-details.component.ts
  @Output() contactCreated = new EventEmitter();
  contactList!: Contact[];
  companyList!: Company[];
  documentId!: string;
  contactForm!: FormGroup;
  faXmark = faXmark;
  faTrashCan = faTrashCan;

  constructor(private formBuilder: FormBuilder, private dbService: dbService) {}

  ngOnInit(): void {
    // subscribe to get contact list
    this.dbService.contacts$.subscribe({
      next: (contacts) => {
        this.contactList = contacts;
        console.log(this.contactList);
      },
    });

    this.dbService.companies$.subscribe({
      next: (companies) => {
        this.companyList = companies;
        // add this validator to the company input post form creation
        // * do not add validator if this is a new company
        if (this.isNewCompany) return;
        this.contactForm
          .get('company')
          ?.addValidators(this.checkCompany(this.companyList));
      },
    });

    this.contactForm = this.formBuilder.group({
      id: [''],
      firstName: [''],
      lastName: [''],
      company: [''],
      title: [''],
      cellNumber: [''],
      officeNumber: [''],
    });
    if (this.detailId) {
      this.dbService.getEntity(this.detailId, 'Contacts').subscribe((ss) => {
        let documents: any;
        ss.docs.forEach((doc: any) => {
          documents = doc.data();
          this.documentId = doc.id;
        });
        this.contactForm.setValue({
          id: documents.id,
          firstName: documents.firstName,
          lastName: documents.lastName,
          company: this.companyList.filter(
            (company) => company.id === documents.company
          )[0].companyName,
          title: documents.title,
          cellNumber: documents.cellNumber,
          officeNumber: documents.officeNumber,
        });
      });
    } else if (this.companyName) {
      this.contactForm.get('company')?.setValue(this.companyName);
    }
  }

  closeDetail() {
    this.closeEvent.emit();
  }

  deleteContact() {
    this.dbService.deleteEntity('Contacts', this.documentId);
    this.closeDetail();
  }

  saveContact() {
    this.contactList.sort(this.dbService.sortList());
    if (this.contactForm.invalid) return;
    this.contactForm.removeValidators(this.checkCompany(this.companyList));
    this.contactForm.patchValue({
      // set to next id number or set to 1 if no companies
      id: this.contactList[this.contactList.length - 1]
        ? this.contactList[this.contactList.length - 1].id + 1
        : 1,
      numberOfTickets: 0,
      company:
        this.companyList.filter(
          (company) =>
            company.companyName === this.contactForm.get('company')?.value
        ).length === 0
          ? this.lastCompanyId + 1
          : this.companyList.filter(
              (company) =>
                company.companyName === this.contactForm.get('company')?.value
            )[0].id,
    });

    this.dbService.updateEntity(
      this.contactForm.value,
      'Contacts',
      this.documentId
    );
    // * push the document ID to the company component, refer to line 81 on company-details.component.ts
    this.contactCreated.emit(this.contactForm.get('id')?.value);

    this.closeDetail();
  }

  // custom validator function to check company input
  checkCompany(companyList: Company[]): ValidatorFn {
    return function (control: AbstractControl): ValidationErrors | null {
      for (let i = 0; i < companyList.length; i++) {
        if (control?.value === companyList[i].companyName) {
          return null;
        }
      }
      return { misMatch: true };
    };
  }
}
