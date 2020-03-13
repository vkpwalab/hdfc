import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgCircleProgressModule } from 'ng-circle-progress';

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
import { DashboardLoanComponent } from './dashboard-loan/dashboard-loan.component';
import { DashboardProjectsComponent } from './dashboard-projects/dashboard-projects.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectDetailsComponent } from './add-project/project-details/project-details.component';
import { AddressDetailsComponent } from './add-project/address-details/address-details.component';
import { ProjectFeaturesComponent } from './add-project/project-features/project-features.component';
import { RERADetailsComponent } from './add-project/rera-details/rera-details.component';
import { BuildersBankComponent } from './add-project/builders-bank/builders-bank.component';
import { UploadDocxComponent } from './add-project/upload-docx/upload-docx.component';

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

  ],
  imports: [
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
