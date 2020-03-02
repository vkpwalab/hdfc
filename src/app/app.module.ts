import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SideMenubarComponent } from './side-menubar/side-menubar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { ChartsModule } from 'ng2-charts';
import { DashboardLoanComponent } from './dashboard-loan/dashboard-loan.component';
import { DashboardProjectsComponent } from './dashboard-projects/dashboard-projects.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideMenubarComponent,
    DashboardComponent,
    FooterComponent,
    AllProjectsComponent,
    DashboardLoanComponent,
    DashboardProjectsComponent,

  ],
  imports: [
    ChartsModule,
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
