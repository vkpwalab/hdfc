import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {MatTabsModule} from '@angular/material/tabs';
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
import { ProjectProgressComponent } from './project-overview/project-progress/project-progress.component';
import { ListOfDocumentsComponent } from './project-overview/list-of-documents/list-of-documents.component';
import { QueriesComponent } from './project-overview/queries/queries.component';
import { LeadsComponent } from './project-overview/leads/leads.component';
import { DisbursementRecordsComponent } from './project-overview/disbursement-records/disbursement-records.component';
import { ProjectAssistanceComponent } from './project-overview/project-assistance/project-assistance.component';

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
    ProjectProgressComponent,
    ListOfDocumentsComponent,
    QueriesComponent,
    LeadsComponent,
    DisbursementRecordsComponent,
    ProjectAssistanceComponent,

  ],
  imports: [
    ChartsModule,
    BrowserModule,
    AppRoutingModule,
    [BrowserAnimationsModule],
    MatFormFieldModule,
    MatTabsModule,
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
export class AppModule { 
  
}
