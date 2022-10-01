import { Entity } from './entity.interface';

// TODO: change primaryContact to Contact type
export interface Company extends Entity {
  id: number;
  companyName: string;
  primaryContact: number;
  numberOfTickets?: number;
  assigned: string;
  address?: {
    street: string;
    city: string;
    zipCode: number;
  };
}

function isCompany(company: Company) {
  return (<Company>company).companyName !== undefined;
}
