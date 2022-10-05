import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Company } from '../interfaces/company.interface';
import { Contact } from '../interfaces/contact.interface';
import { Entity } from '../interfaces/entity.interface';
import { Ticket } from '../interfaces/ticket.interface';

@Injectable({
  providedIn: 'root',
})
export class dbService {
  // TODO: add error handling for retrieving document data
  // * when button to add company is clicked (refer to line 60 on company-details.component.ts) notify service there is a pending company
  pendingCompany!: { name: string; id: number | null } | null;
  // this service handles all three different entities, company, contact and ticket.
  companies$!: Observable<Company[]>;
  contacts$!: Observable<Contact[]>;
  tickets$!: Observable<Ticket[]>;
  constructor(private db: AngularFirestore) {
    // * companies and contacts observables are saved here. Other parts of the app observe these streams to get latest companies and contacts.
    this.companies$ = this.db.collection<Company>('Companies').valueChanges();
    this.contacts$ = this.db.collection<Contact>('Contacts').valueChanges();
  }

  getEntity(
    pattern?: number,
    type: 'Companies' | 'Contacts' = 'Companies'
  ): Observable<any> {
    if (pattern) {
      return this.db
        .collection(type, (ref) => ref.where('id', '==', pattern))
        .get();
    } else {
      return this.db.collection(type).get();
    }
  }

  updateEntity(
    entity: Company | Contact,
    type: 'Companies' | 'Contacts' = 'Companies',
    id: string | null
  ) {
    if (id) {
      this.db.doc(`${type}/${id}`).update(entity);
    } else {
      this.db.collection(type).add(entity);
    }
  }

  deleteEntity(
    type: 'Companies' | 'Contacts' = 'Companies',
    id: string | null
  ) {
    this.db.doc(`${type}/${id}`).delete();
  }

  // using a simple compare function for sorting list
  sortList() {
    return function (a: Entity, b: Entity) {
      const entityA = a.id;
      const entityB = b.id;

      if (entityA > entityB) return 1;
      if (entityB > entityA) return -1;

      return 0;
    };
  }

  getEntityType(
    type: 'Companies' | 'Contacts' | 'Tickets'
  ): Observable<Company[] | Contact[] | Ticket[]> {
    if (type === 'Companies') return this.companies$;
    if (type === 'Contacts') return this.contacts$;
    return this.tickets$;
  }
}
