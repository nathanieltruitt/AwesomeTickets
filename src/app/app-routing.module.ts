import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './components/companies/companies.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ServicesComponent } from './components/services/services.component';

const routes: Routes = [
  {
    path: 'companies',
    component: CompaniesComponent,
  },
  {
    path: 'contacts',
    component: ContactsComponent,
  },
  {
    path: 'services',
    component: ServicesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const RoutingComponents = [
  CompaniesComponent,
  ContactsComponent,
  ServicesComponent,
];
