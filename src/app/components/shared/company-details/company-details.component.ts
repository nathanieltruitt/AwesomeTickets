import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Contact } from 'src/app/interfaces/contact.interface';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css'],
})
export class CompanyDetailsComponent implements OnInit {
  @Input() detailId!: number;
  @Output() closeEvent = new EventEmitter();
  companyForm!: FormGroup;
  faXmark = faXmark;
  contacts: Contact[] = [
    {
      firstName: 'Nathan',
      lastName: 'Truitt',
      companyId: 1,
      title: 'CEO',
      cellNumber: 2707097871,
      officeNumber: 2700000000,
    },
    {
      firstName: 'Derp',
      lastName: 'Truitt',
      companyId: 1,
      title: 'CEO',
      cellNumber: 2707097871,
      officeNumber: 2700000000,
    },
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.companyForm = this.formBuilder.group({
      companyId: [''],
      companyName: [''],
      primaryContact: [''],
      address: this.formBuilder.group({
        street: [''],
        city: [''],
        zipCode: [''],
      }),
    });
  }

  closeDetail() {
    this.closeEvent.emit();
  }
}
