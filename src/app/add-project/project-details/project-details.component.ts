import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import $ from 'jquery';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project_category: any = [];
  project_type: any = [];
  project_stage: any = [];
  project_detail_form: FormGroup;
  developer_names: any;
  builder_detail: any;
  @Input() draft_data: any;
  builder_id: string;
  token: string;
  constructor(private shared: SharedService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.builder_id = '510673';
    this.token = 'MH3NPYK34J0KHDI';

    this.project_detail_form = this.fb.group({
      'project_name': ['', Validators.required],
      'hdfc_branch': [''],
      'project_category': ['', Validators.required],
      'project_type': ['BUILDER/SOCIETY', Validators.required],
      'stage_of_construction': ['', Validators.required],
      'project_launch_date': [''],
      'work_comm_date': [''],
      'expected_comp_date': [''],
      'developer_name': [''],
      'website': [''],
      'remark': ['', Validators.required],
    })

    this.getBuilersDetails();
    this.getProjCategory();
    this.getProjStage();
    this.getProjType();
    this.getDeveloperName();


  }

  getProjCategory() {
    let body_proj_category = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                  <soapenv:Header/>
                                  <soapenv:Body>
                                    <tem:Get_MASTER_DATA>
                                        <!--Optional:-->
                                        <tem:I_CD_VAL>PROJ_CATEGORY</tem:I_CD_VAL>
                                        <!--Optional:-->
                                        <tem:Token>${this.token}</tem:Token>
                                    </tem:Get_MASTER_DATA>
                                  </soapenv:Body>
                              </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/Get_MASTER_DATA';
    let result_tag = 'Get_MASTER_DATAResult';
    this.shared.getData(soapaction, body_proj_category, result_tag).subscribe(
      (data) => {
        this.project_category = data.Table;
        console.log(this.project_category);
      }
    );

  }

  getProjType() {
    let body_project_type = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                  <soapenv:Header/>
                                  <soapenv:Body>
                                    <tem:Get_Project_Type>
                                        <!--Optional:-->
                                        <tem:Token>${this.token}</tem:Token>
                                    </tem:Get_Project_Type>
                                  </soapenv:Body>
                              </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/Get_Project_Type';
    let result_tag = 'Get_Project_TypeResult';
    this.shared.getData(soapaction, body_project_type, result_tag).subscribe(
      (data) => {
        this.project_type = data.Table;
        console.log(this.project_type);
      }
    );
  }

  getProjStage() {
    let body_project_stage = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                  <soapenv:Header/>
                                  <soapenv:Body>
                                    <tem:Get_MASTER_DATA>
                                        <!--Optional:-->
                                        <tem:I_CD_VAL>PROJECTSTAGE</tem:I_CD_VAL>
                                        <!--Optional:-->
                                        <tem:Token>${this.token}</tem:Token>
                                    </tem:Get_MASTER_DATA>
                                  </soapenv:Body>
                              </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/Get_MASTER_DATA';
    let result_tag = 'Get_MASTER_DATAResult';
    this.shared.getData(soapaction, body_project_stage, result_tag).subscribe(
      (data) => {
        this.project_stage = data.Table;
        console.log(this.project_stage);
      }
    );
  }

  getDeveloperName() {
    let body_developer_name = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                  <soapenv:Header/>
                                  <soapenv:Body>
                                    <tem:get_builderid_grp_bldr_list>
                                        <!--Optional:-->
                                        <tem:i_builder_id>${this.builder_id}</tem:i_builder_id>
                                        <!--Optional:-->
                                        <tem:Token>${this.token}</tem:Token>
                                    </tem:get_builderid_grp_bldr_list>
                                  </soapenv:Body>
                              </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/get_builderid_grp_bldr_list';
    let result_tag = 'get_builderid_grp_bldr_listResult';
    this.shared.getData(soapaction, body_developer_name, result_tag).subscribe(
      (data) => {
        this.developer_names = data.Table;
        console.log(this.developer_names);
      }
    );
  }

  getBuilersDetails() {
    let body_builders_details = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                    <soapenv:Header/>
                                    <soapenv:Body>
                                      <tem:GetBuilderDetails>
                                          <!--Optional:-->
                                          <tem:BUILDERID>${this.builder_id}</tem:BUILDERID>
                                          <!--Optional:-->
                                          <tem:Token>${this.token}</tem:Token>
                                      </tem:GetBuilderDetails>
                                    </soapenv:Body>
                                </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/GetBuilderDetails';
    let result_tag = 'GetBuilderDetailsResult';
    this.shared.getData(soapaction, body_builders_details, result_tag).subscribe(
      (data) => {
        this.builder_detail = data.Table;
          this.project_detail_form.controls['hdfc_branch'].setValue(this.builder_detail[0].CD_DESC);
          console.log(this.builder_detail);
      }
    );
  }

  submitProjectDetail(data) {
    console.log(data);
    if (this.project_detail_form.valid) {
      $('#pills-tabContent > .active').next().addClass('active').prev().removeClass('active')
      $('#pills-tab > li > .active').parent('li').next().children('a').addClass('active').parent().prev().children().removeClass('active');

      localStorage.setItem('project_detail', JSON.stringify(data));
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log('value changed', this.draft_data);
    this.project_detail_form.controls['project_name'].setValue(this.draft_data.PROJECT_NAME);
    this.project_detail_form.controls['hdfc_branch'].setValue(this.draft_data.BRANCH);
    this.project_detail_form.controls['project_category'].setValue(this.draft_data.PROJECT_CATEGORY);
    this.project_detail_form.controls['stage_of_construction'].setValue(this.draft_data.STAGE_OF_CONST);
    this.project_detail_form.controls['project_launch_date'].setValue(this.draft_data.PROJECT_LAUNCH_DATE);
    this.project_detail_form.controls['work_comm_date'].setValue(this.draft_data.WORK_COMMENCEMENT_DATE);
    this.project_detail_form.controls['expected_comp_date'].setValue(this.draft_data.PROPOSED_ACTL_COMPTION_DATE);
    this.project_detail_form.controls['developer_name'].setValue(this.draft_data.DEVELOPER_NAME);
    this.project_detail_form.controls['website'].setValue(this.draft_data.WEBSITE_URL);
    this.project_detail_form.controls['remark'].setValue(this.draft_data.REMARK);
  }
}
