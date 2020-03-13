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


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'side-menubar', component: SideMenubarComponent},
  { path: 'dashboard', component: DashboardComponent},
 
  { path: 'footer', component: FooterComponent},
  { path: 'all-projects', component: AllProjectsComponent},
  { path: 'update-work', component: UpdateWorkComponent},
  { path: 'add-project', component: AddProjectComponent},
  { path: 'project-overview', component: ProjectOverviewComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
