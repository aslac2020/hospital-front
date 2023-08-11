import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './screens/home/home.component';
import { PatientsComponent } from './screens/patients/patients.component';
import { SidenavComponent } from './screens/sidenav/sidenav.component';
import { CreateConsultsComponent } from './screens/consults/create-consults/create-consults.component';
import { EditConsultsComponent } from './screens/consults/edit-consults/edit-consults.component';
import { DialogComponent } from './dialog/dialog.component';
import { ViewConsultsComponent } from './screens/consults/view-consults/view-consults.component';
import { RoomAvaliateComponent } from './screens/roomavaliate/room-avaliate.component';

import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';


import { CpfPipe } from './pipes/cpf.pipe';
import { ConsultsPatientComponent } from './screens/doctors/consults-patient/consults-patient.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SidenavComponent,
    PatientsComponent,
    CreateConsultsComponent,
    EditConsultsComponent,
    DialogComponent,
    ViewConsultsComponent,
    CpfPipe,
    RoomAvaliateComponent,
    ConsultsPatientComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatSidenavModule,
    MatDividerModule,
    MatButtonModule,
    MatStepperModule,
    MatRadioModule,
    MatSelectModule,
    AppRoutingModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCheckboxModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
