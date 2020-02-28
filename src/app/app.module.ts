import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SideMenubarComponent } from './side-menubar/side-menubar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideMenubarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    [BrowserAnimationsModule],
    MatFormFieldModule,
    MatInputModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
