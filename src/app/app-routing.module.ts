import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SideMenubarComponent } from './side-menubar/side-menubar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { UpdateWorkComponent } from './update-work/update-work.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { CustomerLeadComponent } from './customer-lead/customer-lead.component';
import { ProjectDistursementComponent } from './project-distursement/project-distursement.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { RaiseDemandComponent } from './raise-demand/raise-demand.component';
import { SettingComponent } from './setting/setting.component';
import { ReachUsComponent } from './reach-us/reach-us.component';



const routes: Routes = [
  { path: '', component:  DashboardComponent},
  { path: 'login', component: LoginComponent},
  { path: 'side-menubar', component: SideMenubarComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'calculator', component: CalculatorComponent},
  { path: 'footer', component: FooterComponent},
  { path: 'all-projects', component: AllProjectsComponent},
  { path: 'update-work', component: UpdateWorkComponent},
  { path: 'add-project', component: AddProjectComponent},
  { path: 'project-overview', component: ProjectOverviewComponent},
  { path: 'customer-lead', component: CustomerLeadComponent},
  { path: 'project-disbursement', component: ProjectDistursementComponent},
  { path: 'raise-demand', component: RaiseDemandComponent},
  { path: 'setting', component: SettingComponent},
  { path: 'reach-us', component: ReachUsComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
