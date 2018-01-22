import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';

import { MaterializeModule } from 'angular2-materialize';
import { LoginService } from './shared/services/login.service';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { BancoGuard } from './guards/banco.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MaterializeModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    LoginService,
    AuthGuard, 
    AdminGuard,
    BancoGuard
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
