import { Entity } from './entity.interface';

// TODO: change company to Company type
export interface Contact extends Entity {
  id: number;
  firstName: string;
  lastName: string;
  company: number;
  title: string;
  cellNumber: number;
  officeNumber: number;
}
