import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgCircleProgressModule } from 'ng-circle-progress';

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
import { UpdateWorkComponent } from './update-work/update-work.component';

import { ChartsModule } from 'ng2-charts';
import { DashboardLoanComponent } from './dashboard/dashboard-loan/dashboard-loan.component';
import { DashboardProjectsComponent } from './dashboard/dashboard-projects/dashboard-projects.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideMenubarComponent,
    DashboardComponent,
    FooterComponent,
    AllProjectsComponent,
    UpdateWorkComponent,
    DashboardLoanComponent,
    DashboardProjectsComponent,
    ProjectOverviewComponent,

  ],
  imports: [
    ChartsModule,
    BrowserModule,
    AppRoutingModule,
    [BrowserAnimationsModule],
    MatFormFieldModule,
    MatInputModule,NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300
    })
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
