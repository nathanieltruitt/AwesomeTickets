import { Company } from './company.interface';
import { Contact } from './contact.interface';
import { Note } from './note.interface';
import { Entity } from './entity.interface';

export interface Ticket extends Entity {
  summary: string;
  company: number;
  contact: number;
  assigned: string;
  time: number;
  description: string;
  notes: string;
}
