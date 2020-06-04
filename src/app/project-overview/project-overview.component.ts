import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import {FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.css']
})
export class ProjectOverviewComponent implements OnInit {
 
  construction_stage1 = new FormControl('', Validators.required);
  construction_stage2 = new FormControl('', Validators.required);
  construction_stage3 = new FormControl('', Validators.required);
  slab_complete1 = new FormControl('', Validators.required);
  slab_complete2 = new FormControl('', Validators.required);
  slab_complete3 = new FormControl('', Validators.required);
  remark1 = new FormControl('', Validators.required);
  remark2 = new FormControl('', Validators.required);
  remark3= new FormControl('', Validators.required);
  calendar1 = new FormControl('',Validators.required);
  calendar2 = new FormControl('',Validators.required);
  calendar3 = new FormControl('',Validators.required);
  project_id: any;
  builder_id: string;
  token: string;
  project_detail: any;
  building_list: any;
  
  
  constructor(private shared : SharedService, private activatedRoute: ActivatedRoute, private route:Router) { }

  ngOnInit(): void {
    this.shared.headerTitle('Project Overview');
    this.builder_id = '510673';
    this.token = 'MH3NPYK34J0KHDI';
    this.activatedRoute.params.subscribe(params => {
      if (params['pid']) {
        this.project_id = params['pid'];
      } else {
        this.route.navigate(['dashboard']);
      }
    });

    this.getProjectDetail();
  }

  getProjectDetail(){
    let body_raise_demand_letter = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                      <soapenv:Header/>
                                      <soapenv:Body>
                                        <tem:GET_PROJECT_OVERVIEW>
                                            <!--Optional:-->
                                            <tem:I_PROJECT_NO>${this.project_id}</tem:I_PROJECT_NO>
                                            <!--Optional:-->
                                            <tem:Token>${this.token}</tem:Token>
                                        </tem:GET_PROJECT_OVERVIEW>
                                      </soapenv:Body>
                                  </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/GET_PROJECT_OVERVIEW';
    let result_tag = 'GET_PROJECT_OVERVIEWResult';
    this.shared.getData(soapaction, body_raise_demand_letter, result_tag).subscribe(
      (data) => {
        this.project_detail = data.Table[0];
        console.log(this.project_detail);
        // this.getBuildingProgress();
      }
    );
  }

  getBuildingProgress() {
    let body_Building_List = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                <soapenv:Header/>
                                <soapenv:Body>
                                  <tem:get_project_building>
                                      <!--Optional:-->
                                      <tem:i_project_no>${this.project_id}</tem:i_project_no>
                                      <!--Optional:-->
                                      <tem:Token>${this.token}</tem:Token>
                                  </tem:get_project_building>
                                </soapenv:Body>
                            </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/get_project_building';
    let result_tag = 'get_project_buildingResult';
    this.shared.getData(soapaction, body_Building_List, result_tag).subscribe(
      (data) => {
        this.building_list = data.Table;
        console.log(this.building_list);
      }
    );
  }
}
