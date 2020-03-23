import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  dashboard_img: string;
  all_project_img: string;
  dashboard_img_active: string;
  all_project_img_active: string;
  workprogress_img: string;
  workprogress_img_active: string;
  reachus_img_active: string;
  reachus_img: string;

  constructor(private route:Router) { }

  ngOnInit(): void {
    this.dashboard_img= "./assets/images/calculator/Deactive-Dashboard.png";
    this.all_project_img= "./assets/images/calculator/Deactivate-AllProjects.png";
    this.workprogress_img= "./assets/images/calculator/Deactive-workprogress.png";
    this.reachus_img= "./assets/images/calculator/Deactive-reachus.png";
    

    this.dashboard_img_active= "./assets/images/icons/Dashboard.png";
    this.all_project_img_active= "./assets/images/icons/AllProjects.png";
    this.workprogress_img_active= "./assets/images/icons/Update_workprogress.png";
    this.reachus_img_active= "./assets/images/icons/reachus.png";

  }

}
