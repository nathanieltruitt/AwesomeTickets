import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, RoutingComponents } from './app-routing.module';

// Firebase modules
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ServiceBoardComponent } from './components/services/service-board/service-board.component';
import { ServiceBoardListComponent } from './components/services/service-board-list/service-board-list.component';
import { ContactListComponent } from './components/contacts/contact-list/contact-list.component';
import { CompanyDashboardComponent } from './components/companies/company-dashboard/company-dashboard.component';
import { ListComponent } from './components/shared/list/list.component';
import { CompanyDetailsComponent } from './components/shared/company-details/company-details.component';

const firebaseConfig = {
  apiKey: 'AIzaSyDPpUVwBCPqOCdaTHao2d0QczmdNDAiZbY',
  authDomain: 'awesometickets-db409.firebaseapp.com',
  projectId: 'awesometickets-db409',
  storageBucket: 'awesometickets-db409.appspot.com',
  messagingSenderId: '339699692161',
  appId: '1:339699692161:web:e966a231627a4b400a1380',
  measurementId: 'G-NWJK278S01',
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ServiceBoardComponent,
    ServiceBoardListComponent,
    ContactListComponent,
    CompanyDashboardComponent,
    RoutingComponents,
    ListComponent,
    CompanyDetailsComponent,
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
  ],
  providers: [{ provide: Window, useValue: window }],
  bootstrap: [AppComponent],
})
export class AppModule {}
