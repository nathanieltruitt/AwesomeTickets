import { Company } from './company.interface';
import { Contact } from './contact.interface';
import { Note } from './note.interface';
import { Entity } from './entity.interface';

export interface Ticket extends Entity {
  summary: string;
  company: Company;
  contact: Contact;
  assigned: string; // TODO: change to User type
  time: number;
  description: string;
  notes: Array<Note>;
}
