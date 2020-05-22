import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { ISoapMethodResponse } from 'ngx-soap';
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
  constructor(private shared:SharedService, private fb: FormBuilder) { }

  ngOnInit(): void {
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
    setTimeout(() => {
      this.getBuilersDetails();
      this.getProjCategory();
      this.getProjStage();
      this.getProjType();
      this.getDeveloperName();
    }, 2000);

  }

  getProjCategory(){
    let body_project_category = { I_CD_VAL: 'PROJ_CATEGORY', Token: 'MH3NPYK34J0KHDI' };

    (<any>this.shared.client).Get_MASTER_DATA(body_project_category).subscribe(
      (res: ISoapMethodResponse) => {
        console.log('method response', res);
        let xmlResponse = res.xml;
        let result = res.result.Get_MASTER_DATAResult;

        var result_json = JSON.parse(result)

        this.project_category = result_json.Table;

        console.log(this.project_category);
      },
      err => console.log(err)
    );
  }

  getProjType(){
    let body_project_type = {Token: 'MH3NPYK34J0KHDI' };

    (<any>this.shared.client).Get_Project_Type(body_project_type).subscribe(
      (res: ISoapMethodResponse) => {
        console.log('method response', res);
        let xmlResponse = res.xml;
        let result = res.result.Get_Project_TypeResult;

        var result_json = JSON.parse(result)

        this.project_type = result_json.Table;

        console.log(this.project_type);
      },
      err => console.log(err)
    );
  }

  getProjStage(){
    let body_project_stage = { I_CD_VAL: 'PROJECTSTAGE', Token: 'MH3NPYK34J0KHDI' };

    (<any>this.shared.client).Get_MASTER_DATA(body_project_stage).subscribe(
      (res: ISoapMethodResponse) => {
        console.log('method response', res);
        let xmlResponse = res.xml;
        let result = res.result.Get_MASTER_DATAResult;

        var result_json = JSON.parse(result)

        this.project_stage = result_json.Table;

        console.log(this.project_stage);
      },
      err => console.log(err)
    );
  }

  getDeveloperName(){
    let body_developer_name = { i_builder_id: '510673', Token: 'MH3NPYK34J0KHDI' };

    (<any>this.shared.client).get_builderid_grp_bldr_list(body_developer_name).subscribe(
      (res: ISoapMethodResponse) => {
        console.log('method response', res);
        let xmlResponse = res.xml;
        let result = res.result.get_builderid_grp_bldr_listResult;

        var result_json = JSON.parse(result)

        this.developer_names = result_json.Table;

        console.log(this.developer_names);
      },
      err => console.log(err)
    );
  }

  getBuilersDetails(){
    let body_builders_details = { BUILDERID: '510673', Token: 'MH3NPYK34J0KHDI' };

    setTimeout(() => {
      (<any>this.shared.client).GetBuilderDetails(body_builders_details).subscribe(

        (res: ISoapMethodResponse) => {
          console.log('method response', res);
          let xmlResponse = res.xml;
          let result = res.result.GetBuilderDetailsResult;

          var result_json = JSON.parse(result)

          this.builder_detail = result_json.Table;
          this.project_detail_form.controls['hdfc_branch'].setValue(this.builder_detail[0].CD_DESC);
          console.log(this.builder_detail);

        },
        err => console.log(err)
      );
    }, 1000);
  }

  submitProjectDetail(data) {
    console.log(data);
    if(this.project_detail_form.valid){
      $('#pills-tabContent > .active').next().addClass('active').prev().removeClass('active')
      $('#pills-tab > li > .active').parent('li').next().children('a').addClass('active').parent().prev().children().removeClass('active');

      localStorage.setItem('project_detail',JSON.stringify(data));
    }
  }
  

  ngOnChanges(changes: SimpleChanges): void {
    console.log('value changed', this.draft_data);
    this.project_detail_form.controls['project_name'].setValue(this.draft_data.PROJECT_NAME);
    this.project_detail_form.controls['hdfc_branch'].setValue(this.draft_data.BRANCH);
    this.project_detail_form.controls['project_category'].setValue(this.draft_data.PROJECT_CATEGORY);
    this.project_detail_form.controls['stage_of_construction'].setValue(this.draft_data.STAGE_OF_CONST);
    this.project_detail_form.controls['project_launch_date'].setValue(this.draft_data.PROJECT_LAUNCH_DATE);
    this.project_detail_form.controls['work_comm_date'].setValue(this.draft_data.PROJ_COMP_DATE);
    this.project_detail_form.controls['expected_comp_date'].setValue(this.draft_data.PROPOSED_ACTL_COMPTION_DATE);
    this.project_detail_form.controls['developer_name'].setValue(this.draft_data.DEVELOPER_NAME);
    this.project_detail_form.controls['website'].setValue(this.draft_data.WEBSITE_URL);
    this.project_detail_form.controls['remark'].setValue(this.draft_data.REMARK);
  }
}
