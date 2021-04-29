import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'ng-uikit-pro-standard';
import { InputsModule, WavesModule } from 'ng-uikit-pro-standard'

import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DataTableComponent } from './components/data-table/data-table.component';
import { HospitalInfoComponent } from './pages/hospital-info/hospital-info.component';
import { AdminComponent } from './pages/admin/admin.component';
import { FormComponentComponent } from './components/login-form-component/login-form-component.component';

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    HospitalInfoComponent,
    AdminComponent,
    FormComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    InputsModule,
    WavesModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
