import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserlistComponent } from './userlist/userlist.component';
import { AdduserComponent } from './adduser/adduser.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RegisterComponent } from './register/register.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    UserlistComponent,
    AdduserComponent,
    LoginComponent,
    RegisterComponent,
    UpdateuserComponent
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
