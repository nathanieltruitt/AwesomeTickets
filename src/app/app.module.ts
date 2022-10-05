import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

// Firebase modules
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CompanyDashboardComponent } from './components/companies/company-dashboard/company-dashboard.component';
import { ListComponent } from './components/shared/list/list.component';
import { CompanyDetailsComponent } from './components/shared/company-details/company-details.component';
import { ContactDetailsComponent } from './components/shared/contact-details/contact-details.component';
import { TicketComponent } from './components/shared/ticket/ticket.component';

import { environment } from 'src/environments/environment';

const firebaseConfig = {
  apiKey: environment.apiKey,
  authDomain: environment.authDomain,
  projectId: environment.projectId,
  storageBucket: environment.storageBucket,
  messagingSenderId: environment.messagingSenderId,
  appId: environment.appId,
  measurementId: environment.measurementId,
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CompanyDashboardComponent,
    RoutingComponents,
    ListComponent,
    CompanyDetailsComponent,
    ContactDetailsComponent,
    TicketComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
  ],
  providers: [{ provide: Window, useValue: window }],
  bootstrap: [AppComponent],
})
export class AppModule {}
