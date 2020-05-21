import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { ISoapMethodResponse } from 'ngx-soap';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import $ from 'jquery';

@Component({
  selector: 'app-project-features',
  templateUrl: './project-features.component.html',
  styleUrls: ['./project-features.component.css']
})
export class ProjectFeaturesComponent implements OnInit {
  project_feature_form: FormGroup;
  show_fin_inst: boolean;
  show_clps: boolean;
  @Input() draft_data: any;
  constructor(private shared: SharedService, private fb: FormBuilder) {
    this.show_fin_inst = true;
    this.show_clps = true;
  }

  ngOnInit(): void {
    this.project_feature_form = this.fb.group({
      'plot_area': ['', Validators.required],
      'total_no_of_building': ['', Validators.required],
      'total_buildup_area': [''],
      'project_cost': [''],
      'plan_approval_auth_name': [''],
      'total_number': ['', Validators.required],
      'mention_specfic_detail': ['', Validators.required],
      'mortgaged': ['', Validators.required],
      'financial_institute': [''],
      'hdfc_clip_no': [''],
      'contruction_finance': ['', Validators.required],
      'residencial_total_unit': [''],
      'residencial_solid_unit': [''],
      'residencial_available_sale': [''],
      'residencial_rate_per_sqft': [''],
      'residencial_area_unit': [''],
      'commercial_total_unit': [''],
      'commercial_solid_unit': [''],
      'commercial_available_sale': [''],
      'commercial_rate_per_sqft': [''],
      'commercial_area_unit': [''],
      'plot_total_unit': [''],
      'plot_solid_unit': [''],
      'plot_available_sale': [''],
      'plot_rate_per_sqft': [''],
      'plot_area_unit': [''],
      'bungalow_total_unit': [''],
      'bungalow_solid_unit': [''],
      'bungalow_available_sale': [''],
      'bungalow_rate_per_sqft': [''],
      'bungalow_area_unit': [''],
    })

  }


  mortgageChange(event) {
    if (event.value == 'Y') {
      this.show_fin_inst = false;
    } else {
      this.show_fin_inst = true;
      this.project_feature_form.controls['financial_institute'].setValue('');
    }
  }

  enterFinInst(event) {
    console.log(event);
    if (event.target.value === 'hdfc limited') {
      this.show_clps = false;
    } else {
      this.show_clps = true;
      this.project_feature_form.controls['hdfc_clip_no'].setValue('');
    }
  }
  submitProjectFeature(data) {
    console.log(data);
    if (this.project_feature_form.valid) {

      localStorage.setItem('project_feature', JSON.stringify(data));
      let project_detail = JSON.parse(localStorage.getItem('project_detail'));
      let address_detail = JSON.parse(localStorage.getItem('address_detail'));

      let body_create_project = {
        BUILDERID: '510673',
        BLDRGRPId: '',
        Project_Name: project_detail.project_name,
        Project_address: address_detail.address,
        I_WEBSITE_URL: project_detail.website,
        Address_Line: address_detail.address,
        Locations: address_detail.location,
        City_District: address_detail.city,
        State: address_detail.state,
        Pin_code: address_detail.pincode,
        latlong: address_detail.lat + ',' + address_detail.long,
        Project_Staus: '',
        Project_Type: project_detail.project_type,
        Project_Launch_Date: project_detail.project_launch_date,
        Work_commencement_date: project_detail.work_comm_date,
        Proposed_Actl_comption_date: project_detail.expected_comp_date,
        Plan_approval_Authority: data.plan_approval_auth_name,
        Project_Cost: data.project_cost,
        I_IS_APPROVED_BY_OTH_INST: '',
        I_CLPS_NO: data.hdfc_clip_no,
        I_PLOT_AREA: data.plot_area,
        I_REQ_CONST_FIN: data.contruction_finance,
        I_TOTAL_NO_OF_BLD: data.total_no_of_building,
        I_TOTAL_UNIT_BOOKD: '',
        I_TOTAL_UNIT_PROPOSD: '',
        PROJECT_CATEGORY: project_detail.project_category,
        I_PROJ_COMP_DATE: project_detail.expected_comp_date,
        I_STAGE_OF_CONST: project_detail.stage_of_construction,
        I_DEVELOPER_NAME: project_detail.developer_name,
        I_PLOT_NO: address_detail.plot_no,
        Purpose: '',
        Token_Id: '',
        IP: '',
        CREATEBY: '510673',
        UPDATEDBY: '',
        I_BOUNDARY_DET_EAST: address_detail.east,
        I_BOUNDARY_DET_WEST: address_detail.west,
        I_BOUNDARY_DET_SOUTH: address_detail.south,
        I_BOUNDARY_DET_NORTH: address_detail.north,
        I_RESIDENTIAL_PROPOSED_UNIT: data.residencial_total_unit,
        I_RESIDENTIAL_AVAIL_FOR_SALE: data.residencial_available_sale,
        I_RESIDENTIAL_SOLD_UNIT: data.residencial_solid_unit,
        I_RESIDENTIAL_RATE_SQFT: data.residencial_rate_per_sqft,
        I_RESIDENTIAL_AREA_UNIT: data.residencial_area_unit,
        I_COMMERTIAL_PROPOSED_UNIT: data.commercial_total_unit,
        I_COMMERTIAL_AVAIL_FOR_SALE: data.commercial_available_sale,
        I_COMMERTIAL_SOLD_UNIT: data.commercial_solid_unit,
        I_COMMERTIAL_RATE_SQFT: data.commercial_rate_per_sqft,
        I_COMMERTIAL_AREA_UNIT: data.commercial_area_unit,
        I_PLOTS_PROPOSED_UNIT: data.plot_total_unit,
        I_PLOTS_AVAIL_FOR_SALE: data.plot_available_sale,
        I_PLOTS_SOLD_UNIT: data.plot_solid_unit,
        I_PLOTS_RATE_SQFT: data.plot_rate_per_sqft,
        I_PLOTS_AREA_UNIT: data.plot_area_unit,
        I_BUNGLOW_PROPOSED_UNIT: data.bungalow_total_unit,
        I_BUNGLOW_AVAIL_FOR_SALE: data.bungalow_available_sale,
        I_BUNGLOW_SOLD_UNIT: data.bungalow_solid_unit,
        I_BUNGLOW_RATE_SQFT: data.bungalow_rate_per_sqft,
        I_BUNGLOW_AREA_UNIT: data.bungalow_area_unit,
        I_POPULAR_LANDMARK: address_detail.popular_landmark,
        I_TOTAL_BUILT_UP_AREA_SQMT: data.total_buildup_area,
        I_UNITS_ALLOTED_TO_LANDOWN: data.total_number,
        I_LANDOWN_SPEC_DETAILS: data.mention_specfic_detail,
        I_LONGITUDE: address_detail.long,
        I_BRANCH: project_detail.hdfc_branch,
        I_REMARK: project_detail.remark,
        I_IS_MORTGAGE_BY_OTH_ST: data.mortgaged,
        I_FANCIAL_ST: data.financial_institute,
        I_CTS_NO: '',
        Token: 'MH3NPYK34J0KHDI'
      };
      console.log(body_create_project);
      (<any>this.shared.client).Create_project(body_create_project).subscribe(
        (res: ISoapMethodResponse) => {
          console.log('method response', res);
          let xmlResponse = res.xml;
          let result = res.result.Create_projectResult;

          var result_json = JSON.parse(result)
          if (result_json.O_Project_id) {
            this.shared.projectId(result_json.O_Project_id);
            $('#pills-tabContent > .active').next().addClass('active').prev().removeClass('active')
            $('#pills-tab > li > .active').parent('li').next().children('a').addClass('active').parent().prev().children().removeClass('active');
          }
          console.log(result_json);

        },
        err => console.log(err)
      );
    }
  }

  draftProject(data) {
    console.log(data);
    let project_detail = JSON.parse(localStorage.getItem('project_detail'));
    let address_detail = JSON.parse(localStorage.getItem('address_detail'));
    console.log(this.draft_data);
    let body_draft_project = {
      I_DRAFT_ID: this.draft_data ? this.draft_data.DRAFT_ID : null,
      BUILDERID: '510673',
      BLDRGRPId: '',
      Project_Name: project_detail.project_name,
      Project_address: address_detail.address,
      I_WEBSITE_URL: project_detail.website,
      Address_Line: address_detail.address,
      Locations: address_detail.location,
      City_District: address_detail.city,
      State: address_detail.state,
      Pin_code: address_detail.pincode,
      latlong: address_detail.lat + ',' + address_detail.long,
      Project_Staus: '',
      Project_Type: project_detail.project_type,
      Project_Launch_Date: project_detail.project_launch_date,
      Work_commencement_date: project_detail.work_comm_date,
      Proposed_Actl_comption_date: project_detail.expected_comp_date,
      Plan_approval_Authority: data.plan_approval_auth_name,
      Project_Cost: data.project_cost,
      I_IS_APPROVED_BY_OTH_INST: '',
      I_CLPS_NO: data.hdfc_clip_no,
      I_PLOT_AREA: data.plot_area,
      I_REQ_CONST_FIN: data.contruction_finance,
      I_TOTAL_NO_OF_BLD: data.total_no_of_building,
      I_TOTAL_UNIT_BOOKD: '',
      I_TOTAL_UNIT_PROPOSD: '',
      PROJECT_CATEGORY: project_detail.project_category,
      I_PROJ_COMP_DATE: project_detail.expected_comp_date,
      I_STAGE_OF_CONST: project_detail.stage_of_construction,
      I_DEVELOPER_NAME: project_detail.developer_name,
      I_PLOT_NO: address_detail.plot_no,
      Purpose: '',
      Token_Id: '',
      IP: '',
      CREATEBY: '510673',
      UPDATEDBY: '',
      I_BOUNDARY_DET_EAST: address_detail.east,
      I_BOUNDARY_DET_WEST: address_detail.west,
      I_BOUNDARY_DET_SOUTH: address_detail.south,
      I_BOUNDARY_DET_NORTH: address_detail.north,
      I_RESIDENTIAL_PROPOSED_UNIT: data.residencial_total_unit,
      I_RESIDENTIAL_AVAIL_FOR_SALE: data.residencial_available_sale,
      I_RESIDENTIAL_SOLD_UNIT: data.residencial_solid_unit,
      I_RESIDENTIAL_RATE_SQFT: data.residencial_rate_per_sqft,
      I_RESIDENTIAL_AREA_UNIT: data.residencial_area_unit,
      I_COMMERTIAL_PROPOSED_UNIT: data.commercial_total_unit,
      I_COMMERTIAL_AVAIL_FOR_SALE: data.commercial_available_sale,
      I_COMMERTIAL_SOLD_UNIT: data.commercial_solid_unit,
      I_COMMERTIAL_RATE_SQFT: data.commercial_rate_per_sqft,
      I_COMMERTIAL_AREA_UNIT: data.commercial_area_unit,
      I_PLOTS_PROPOSED_UNIT: data.plot_total_unit,
      I_PLOTS_AVAIL_FOR_SALE: data.plot_available_sale,
      I_PLOTS_SOLD_UNIT: data.plot_solid_unit,
      I_PLOTS_RATE_SQFT: data.plot_rate_per_sqft,
      I_PLOTS_AREA_UNIT: data.plot_area_unit,
      I_BUNGLOW_PROPOSED_UNIT: data.bungalow_total_unit,
      I_BUNGLOW_AVAIL_FOR_SALE: data.bungalow_available_sale,
      I_BUNGLOW_SOLD_UNIT: data.bungalow_solid_unit,
      I_BUNGLOW_RATE_SQFT: data.bungalow_rate_per_sqft,
      I_BUNGLOW_AREA_UNIT: data.bungalow_area_unit,
      I_POPULAR_LANDMARK: address_detail.popular_landmark,
      I_TOTAL_BUILT_UP_AREA_SQMT: data.total_buildup_area,
      I_UNITS_ALLOTED_TO_LANDOWN: data.total_number,
      I_LANDOWN_SPEC_DETAILS: data.mention_specfic_detail,
      I_LONGITUDE: address_detail.long,
      I_BRANCH: project_detail.hdfc_branch,
      I_REMARK: project_detail.remark,
      I_IS_MORTGAGE_BY_OTH_ST: data.mortgaged,
      I_FANCIAL_ST: data.financial_institute,
      I_CTS_NO: '',
      Token: 'MH3NPYK34J0KHDI'
    };
    console.log(body_draft_project);

    (<any>this.shared.client).P_draft_project(body_draft_project).subscribe(
      (res: ISoapMethodResponse) => {
        console.log('method response', res);
        let xmlResponse = res.xml;
        let result = res.result.P_draft_projectResult;

        var result_json = JSON.parse(result)
        if (result_json.O_Msg == 'Project DRAFT created.') {
          alert("Project drafted successfully");
          // location.reload();
        }
        console.log(result_json);

      },
      err => console.log(err)
    );

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('value changed', this.draft_data);

    this.project_feature_form.controls['plot_area'].setValue(this.draft_data.PLOT_AREA);
    this.project_feature_form.controls['total_no_of_building'].setValue(this.draft_data.TOTAL_NO_OF_BLD);
    this.project_feature_form.controls['total_buildup_area'].setValue(this.draft_data.TOTAL_BUILT_UP_AREA_SQMT);
    this.project_feature_form.controls['project_cost'].setValue(this.draft_data.PROJECT_COST);
    this.project_feature_form.controls['plan_approval_auth_name'].setValue(this.draft_data.PLAN_APPROVAL_AUTHORITY);
    this.project_feature_form.controls['total_number'].setValue(this.draft_data.UNITS_ALLOTED_TO_LANDOWN);
    this.project_feature_form.controls['mention_specfic_detail'].setValue(this.draft_data.LANDOWN_SPEC_DETAILS);
    this.project_feature_form.controls['financial_institute'].setValue(this.draft_data.FINANCIAL_INST);
    this.project_feature_form.controls['hdfc_clip_no'].setValue(this.draft_data.CLPS_NO);
    this.project_feature_form.controls['contruction_finance'].setValue(this.draft_data.CONSTRUCTION_FINANCE_INST);
    this.project_feature_form.controls['mortgaged'].setValue(this.draft_data.IS_PROJ_MORGAGE);
    this.project_feature_form.controls['residencial_total_unit'].setValue(this.draft_data.RESIDENTIAL_PROPOSED_UNIT);
    this.project_feature_form.controls['residencial_solid_unit'].setValue(this.draft_data.RESIDENTIAL_SOLD_UNIT);
    this.project_feature_form.controls['residencial_available_sale'].setValue(this.draft_data.RESIDENTIAL_AVAILABLE_FOR_SALE);
    this.project_feature_form.controls['residencial_rate_per_sqft'].setValue(this.draft_data.RESIDENTIAL_RATE_SQFT);
    this.project_feature_form.controls['residencial_area_unit'].setValue(this.draft_data.RESIDENTIAL_AREA_UNIT);
    this.project_feature_form.controls['commercial_total_unit'].setValue(this.draft_data.COMMERTIAL_PROPOSED_UNIT);
    this.project_feature_form.controls['commercial_solid_unit'].setValue(this.draft_data.COMMERTIAL_SOLD_UNIT);
    this.project_feature_form.controls['commercial_available_sale'].setValue(this.draft_data.COMMERTIAL_AVAILABLE_FOR_SALE);
    this.project_feature_form.controls['commercial_rate_per_sqft'].setValue(this.draft_data.COMMERTIAL_RATE_SQFT);
    this.project_feature_form.controls['commercial_area_unit'].setValue(this.draft_data.COMMERTIAL_AREA_UNIT);
    this.project_feature_form.controls['plot_total_unit'].setValue(this.draft_data.PLOTS_PROPOSED_UNIT);
    this.project_feature_form.controls['plot_solid_unit'].setValue(this.draft_data.PLOTS_SOLD_UNIT);
    this.project_feature_form.controls['plot_available_sale'].setValue(this.draft_data.PLOTS_AVAILABLE_FOR_SALE);
    this.project_feature_form.controls['plot_rate_per_sqft'].setValue(this.draft_data.PLOTS_RATE_SQFT);
    this.project_feature_form.controls['plot_area_unit'].setValue(this.draft_data.PLOTS_AREA_UNIT);
    this.project_feature_form.controls['bungalow_total_unit'].setValue(this.draft_data.BUNGLOW_PROPOSED_UNIT);
    this.project_feature_form.controls['bungalow_solid_unit'].setValue(this.draft_data.BUNGLOW_SOLD_UNIT);
    this.project_feature_form.controls['bungalow_available_sale'].setValue(this.draft_data.BUNGLOW_AVAILABLE_FOR_SALE);
    this.project_feature_form.controls['bungalow_rate_per_sqft'].setValue(this.draft_data.BUNGLOW_RATE_SQFT);
    this.project_feature_form.controls['bungalow_area_unit'].setValue(this.draft_data.BUNGLOW_AREA_UNIT);
  }
}
