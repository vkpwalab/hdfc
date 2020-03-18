import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { MatRadioModule} from '@angular/material/radio';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import { NgxFileDropModule } from 'ngx-file-drop';

import { SideMenubarComponent } from './side-menubar/side-menubar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { UpdateWorkComponent } from './update-work/update-work.component';

import { ChartsModule } from 'ng2-charts';
// import { DashboardLoanComponent } from './dashboard-loan/dashboard-loan.component';
// import { DashboardProjectsComponent } from './dashboard-projects/dashboard-projects.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectDetailsComponent } from './add-project/project-details/project-details.component';
import { AddressDetailsComponent } from './add-project/address-details/address-details.component';
import { ProjectFeaturesComponent } from './add-project/project-features/project-features.component';
import { RERADetailsComponent } from './add-project/rera-details/rera-details.component';
import { BuildersBankComponent } from './add-project/builders-bank/builders-bank.component';
import { UploadDocxComponent } from './add-project/upload-docx/upload-docx.component';
import { DashboardLoanComponent } from './dashboard/dashboard-loan/dashboard-loan.component';
import { DashboardProjectsComponent } from './dashboard/dashboard-projects/dashboard-projects.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { ProjectProgressComponent } from './project-overview/project-progress/project-progress.component';
import { ListOfDocumentsComponent } from './project-overview/list-of-documents/list-of-documents.component';
import { QueriesComponent } from './project-overview/queries/queries.component';
import { LeadsComponent } from './project-overview/leads/leads.component';
import { DisbursementRecordsComponent } from './project-overview/disbursement-records/disbursement-records.component';
import { ProjectAssistanceComponent } from './project-overview/project-assistance/project-assistance.component';
import { CustomerLeadComponent } from './customer-lead/customer-lead.component';
import { ProjectDistursementComponent } from './project-distursement/project-distursement.component';
import { CalculatorComponent } from './calculator/calculator.component';

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
    AddProjectComponent,
    ProjectDetailsComponent,
    AddressDetailsComponent,
    ProjectFeaturesComponent,
    RERADetailsComponent,
    BuildersBankComponent,
    UploadDocxComponent,
    ProjectOverviewComponent,
    ProjectProgressComponent,
    ListOfDocumentsComponent,
    QueriesComponent,
    LeadsComponent,
    DisbursementRecordsComponent,
    ProjectAssistanceComponent,
    CustomerLeadComponent,
    ProjectDistursementComponent,
    CalculatorComponent,

  ],
  imports: [
    MatSlideToggleModule,
    ChartsModule,
    BrowserModule,
    AppRoutingModule,
    [BrowserAnimationsModule],
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxFileDropModule,
    MatFormFieldModule,
    DragDropModule,
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
