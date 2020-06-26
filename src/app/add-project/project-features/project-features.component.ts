import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

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
  builder_id: string;
  token: string;
  constructor(private shared: SharedService, private fb: FormBuilder) {
    this.show_fin_inst = true;
    this.show_clps = true;
  }

  ngOnInit(): void {
    this.builder_id = '510673';
    this.token = 'MH3NPYK34J0KHDI';
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
      'contruction_finance': [''],
      'residencial_total_unit': [0],
      'residencial_solid_unit': [0],
      'residencial_available_sale': [0],
      'residencial_rate_per_sqft': [0],
      'residencial_area_unit': [''],
      'commercial_total_unit': [0],
      'commercial_solid_unit': [0],
      'commercial_available_sale': [0],
      'commercial_rate_per_sqft': [0],
      'commercial_area_unit': [''],
      'plot_total_unit': [0],
      'plot_solid_unit': [0],
      'plot_available_sale': [0],
      'plot_rate_per_sqft': [0],
      'plot_area_unit': [''],
      'bungalow_total_unit': [0],
      'bungalow_solid_unit': [0],
      'bungalow_available_sale': [0],
      'bungalow_rate_per_sqft': [0],
      'bungalow_area_unit': [''],
    })
      //  for accordion
    $('.card-header').click(function() { 
      $(this).find('i').toggleClass('fas fa-plus fas fa-minus'); 
  });
        //  for accordion
  }


  mortgageChange(event) {
    if (event.value == 'Y') {
      this.show_fin_inst = false;
      this.project_feature_form.controls['contruction_finance'].reset();
      this.project_feature_form.controls['contruction_finance'].clearValidators();
      this.project_feature_form.controls['contruction_finance'].updateValueAndValidity({onlySelf: true});
    } else {
      this.show_fin_inst = true;
      this.project_feature_form.controls['financial_institute'].setValue('');
      this.project_feature_form.controls['contruction_finance'].setValidators([Validators.required]);
      this.project_feature_form.controls['contruction_finance'].updateValueAndValidity({onlySelf: true});

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
    console.log(this.project_feature_form.controls['contruction_finance'].valid);
    if (this.project_feature_form.valid) {

      localStorage.setItem('project_feature', JSON.stringify(data));
      let project_detail = JSON.parse(localStorage.getItem('project_detail'));
      let address_detail = JSON.parse(localStorage.getItem('address_detail'));

      let body_create_project = {
        BUILDERID: this.builder_id,
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
        CREATEBY: this.builder_id,
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

      let body_draft_xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                  <soapenv:Header/>
                                  <soapenv:Body>
                                      <tem:Create_project>
                                        <!--Optional:-->
                                        <tem:BUILDERID>${body_create_project.BUILDERID}</tem:BUILDERID>
                                        <!--Optional:-->
                                        <tem:BLDRGRPId></tem:BLDRGRPId>
                                        <!--Optional:-->
                                        <tem:Project_Name>${body_create_project.Project_Name}</tem:Project_Name>
                                        <!--Optional:-->
                                        <tem:Project_address>${body_create_project.Project_address}</tem:Project_address>
                                        <!--Optional:-->
                                        <tem:I_Plot_Bearing_No></tem:I_Plot_Bearing_No>
                                        <!--Optional:-->
                                        <tem:Address_Line>${body_create_project.Address_Line}</tem:Address_Line>
                                        <!--Optional:-->
                                        <tem:Locations>${body_create_project.Locations}</tem:Locations>
                                        <!--Optional:-->
                                        <tem:City_District>${body_create_project.City_District}</tem:City_District>
                                        <!--Optional:-->
                                        <tem:State>${body_create_project.State}</tem:State>
                                        <!--Optional:-->
                                        <tem:Pin_code>${body_create_project.Pin_code}</tem:Pin_code>
                                        <!--Optional:-->
                                        <tem:latlong>${body_create_project.latlong}</tem:latlong>
                                        <!--Optional:-->
                                        <tem:Project_Staus>${body_create_project.Project_Staus}</tem:Project_Staus>
                                        <!--Optional:-->
                                        <tem:Project_Type>${body_create_project.Project_Type}</tem:Project_Type>
                                        <!--Optional:-->
                                        <tem:Project_Launch_Date>${body_create_project.Project_Launch_Date}</tem:Project_Launch_Date>
                                        <!--Optional:-->
                                        <tem:Work_commencement_date>${body_create_project.Work_commencement_date}</tem:Work_commencement_date>
                                        <!--Optional:-->
                                        <tem:Proposed_Actl_comption_date>${body_create_project.Proposed_Actl_comption_date}</tem:Proposed_Actl_comption_date>
                                        <!--Optional:-->
                                        <tem:Plan_approval_Authority>${body_create_project.Plan_approval_Authority}</tem:Plan_approval_Authority>
                                        <!--Optional:-->
                                        <tem:Project_Cost>${body_create_project.Project_Cost}</tem:Project_Cost>
                                        <!--Optional:-->
                                        <tem:I_IS_APPROVED_BY_OTH_INST>${body_create_project.I_IS_APPROVED_BY_OTH_INST}</tem:I_IS_APPROVED_BY_OTH_INST>
                                        <!--Optional:-->
                                        <tem:I_CLPS_NO>${body_create_project.I_CLPS_NO}</tem:I_CLPS_NO>
                                        <!--Optional:-->
                                        <tem:I_PLOT_AREA>${body_create_project.I_PLOT_AREA}</tem:I_PLOT_AREA>
                                        <!--Optional:-->
                                        <tem:I_REQ_CONST_FIN>${body_create_project.I_REQ_CONST_FIN}</tem:I_REQ_CONST_FIN>
                                        <!--Optional:-->
                                        <tem:I_TOTAL_NO_OF_BLD>${body_create_project.I_TOTAL_NO_OF_BLD}</tem:I_TOTAL_NO_OF_BLD>
                                        <!--Optional:-->
                                        <tem:I_TOTAL_UNIT_BOOKD>${body_create_project.I_TOTAL_UNIT_BOOKD}</tem:I_TOTAL_UNIT_BOOKD>
                                        <!--Optional:-->
                                        <tem:I_TOTAL_UNIT_PROPOSD>${body_create_project.I_TOTAL_UNIT_PROPOSD}</tem:I_TOTAL_UNIT_PROPOSD>
                                        <!--Optional:-->
                                        <tem:PROJECT_CATEGORY>${body_create_project.PROJECT_CATEGORY}</tem:PROJECT_CATEGORY>
                                        <!--Optional:-->
                                        <tem:I_PROJ_COMP_DATE>${body_create_project.I_PROJ_COMP_DATE}</tem:I_PROJ_COMP_DATE>
                                        <!--Optional:-->
                                        <tem:I_STAGE_OF_CONST>${body_create_project.I_STAGE_OF_CONST}</tem:I_STAGE_OF_CONST>
                                        <!--Optional:-->
                                        <tem:I_DEVELOPER_NAME>${body_create_project.I_DEVELOPER_NAME}</tem:I_DEVELOPER_NAME>
                                        <!--Optional:-->
                                        <tem:I_PLOT_NO>${body_create_project.I_PLOT_NO}</tem:I_PLOT_NO>
                                        <!--Optional:-->
                                        <tem:Purpose>${body_create_project.Purpose}</tem:Purpose>
                                        <!--Optional:-->
                                        <tem:Token_Id>${body_create_project.Token_Id}</tem:Token_Id>
                                        <!--Optional:-->
                                        <tem:IP>${body_create_project.IP}</tem:IP>
                                        <!--Optional:-->
                                        <tem:CREATEBY>${body_create_project.CREATEBY}</tem:CREATEBY>
                                        <!--Optional:-->
                                        <tem:UPDATEDBY>${body_create_project.UPDATEDBY}</tem:UPDATEDBY>
                                        <!--Optional:-->
                                        <tem:I_BOUNDARY_DET_EAST>${body_create_project.I_BOUNDARY_DET_EAST}</tem:I_BOUNDARY_DET_EAST>
                                        <!--Optional:-->
                                        <tem:I_BOUNDARY_DET_WEST>${body_create_project.I_BOUNDARY_DET_WEST}</tem:I_BOUNDARY_DET_WEST>
                                        <!--Optional:-->
                                        <tem:I_BOUNDARY_DET_SOUTH>${body_create_project.I_BOUNDARY_DET_SOUTH}</tem:I_BOUNDARY_DET_SOUTH>
                                        <!--Optional:-->
                                        <tem:I_BOUNDARY_DET_NORTH>${body_create_project.I_BOUNDARY_DET_NORTH}</tem:I_BOUNDARY_DET_NORTH>
                                        <!--Optional:-->
                                        <tem:I_RESIDENTIAL_PROPOSED_UNIT>${body_create_project.I_RESIDENTIAL_PROPOSED_UNIT}</tem:I_RESIDENTIAL_PROPOSED_UNIT>
                                        <!--Optional:-->
                                        <tem:I_RESIDENTIAL_AVAIL_FOR_SALE>${body_create_project.I_RESIDENTIAL_AVAIL_FOR_SALE}</tem:I_RESIDENTIAL_AVAIL_FOR_SALE>
                                        <!--Optional:-->
                                        <tem:I_RESIDENTIAL_SOLD_UNIT>${body_create_project.I_RESIDENTIAL_SOLD_UNIT}</tem:I_RESIDENTIAL_SOLD_UNIT>
                                        <!--Optional:-->
                                        <tem:I_RESIDENTIAL_RATE_SQFT>${body_create_project.I_RESIDENTIAL_RATE_SQFT}</tem:I_RESIDENTIAL_RATE_SQFT>
                                        <!--Optional:-->
                                        <tem:I_RESIDENTIAL_AREA_UNIT>${body_create_project.I_RESIDENTIAL_AREA_UNIT}</tem:I_RESIDENTIAL_AREA_UNIT>
                                        <!--Optional:-->
                                        <tem:I_COMMERTIAL_PROPOSED_UNIT>${body_create_project.I_COMMERTIAL_PROPOSED_UNIT}</tem:I_COMMERTIAL_PROPOSED_UNIT>
                                        <!--Optional:-->
                                        <tem:I_COMMERTIAL_AVAIL_FOR_SALE>${body_create_project.I_COMMERTIAL_AVAIL_FOR_SALE}</tem:I_COMMERTIAL_AVAIL_FOR_SALE>
                                        <!--Optional:-->
                                        <tem:I_COMMERTIAL_SOLD_UNIT>${body_create_project.I_COMMERTIAL_SOLD_UNIT}</tem:I_COMMERTIAL_SOLD_UNIT>
                                        <!--Optional:-->
                                        <tem:I_COMMERTIAL_RATE_SQFT>${body_create_project.I_COMMERTIAL_RATE_SQFT}</tem:I_COMMERTIAL_RATE_SQFT>
                                        <!--Optional:-->
                                        <tem:I_COMMERTIAL_AREA_UNIT>${body_create_project.I_COMMERTIAL_AREA_UNIT}</tem:I_COMMERTIAL_AREA_UNIT>
                                        <!--Optional:-->
                                        <tem:I_PLOTS_PROPOSED_UNIT>${body_create_project.I_PLOTS_PROPOSED_UNIT}</tem:I_PLOTS_PROPOSED_UNIT>
                                        <!--Optional:-->
                                        <tem:I_PLOTS_AVAIL_FOR_SALE>${body_create_project.I_PLOTS_AVAIL_FOR_SALE}</tem:I_PLOTS_AVAIL_FOR_SALE>
                                        <!--Optional:-->
                                        <tem:I_PLOTS_SOLD_UNIT>${body_create_project.I_PLOTS_SOLD_UNIT}</tem:I_PLOTS_SOLD_UNIT>
                                        <!--Optional:-->
                                        <tem:I_PLOTS_RATE_SQFT>${body_create_project.I_PLOTS_RATE_SQFT}</tem:I_PLOTS_RATE_SQFT>
                                        <!--Optional:-->
                                        <tem:I_PLOTS_AREA_UNIT>${body_create_project.I_PLOTS_AREA_UNIT}</tem:I_PLOTS_AREA_UNIT>
                                        <!--Optional:-->
                                        <tem:I_BUNGLOW_PROPOSED_UNIT>${body_create_project.I_BUNGLOW_PROPOSED_UNIT}</tem:I_BUNGLOW_PROPOSED_UNIT>
                                        <!--Optional:-->
                                        <tem:I_BUNGLOW_AVAIL_FOR_SALE>${body_create_project.I_BUNGLOW_AVAIL_FOR_SALE}</tem:I_BUNGLOW_AVAIL_FOR_SALE>
                                        <!--Optional:-->
                                        <tem:I_BUNGLOW_SOLD_UNIT>${body_create_project.I_BUNGLOW_SOLD_UNIT}</tem:I_BUNGLOW_SOLD_UNIT>
                                        <!--Optional:-->
                                        <tem:I_BUNGLOW_RATE_SQFT>${body_create_project.I_BUNGLOW_RATE_SQFT}</tem:I_BUNGLOW_RATE_SQFT>
                                        <!--Optional:-->
                                        <tem:I_BUNGLOW_AREA_UNIT>${body_create_project.I_BUNGLOW_AREA_UNIT}</tem:I_BUNGLOW_AREA_UNIT>
                                        <!--Optional:-->
                                        <tem:I_POPULAR_LANDMARK>${body_create_project.I_POPULAR_LANDMARK}</tem:I_POPULAR_LANDMARK>
                                        <!--Optional:-->
                                        <tem:I_TOTAL_BUILT_UP_AREA_SQMT>${body_create_project.I_TOTAL_BUILT_UP_AREA_SQMT}</tem:I_TOTAL_BUILT_UP_AREA_SQMT>
                                        <!--Optional:-->
                                        <tem:I_UNITS_ALLOTED_TO_LANDOWN>${body_create_project.I_UNITS_ALLOTED_TO_LANDOWN}</tem:I_UNITS_ALLOTED_TO_LANDOWN>
                                        <!--Optional:-->
                                        <tem:I_LANDOWN_SPEC_DETAILS>${body_create_project.I_LANDOWN_SPEC_DETAILS}</tem:I_LANDOWN_SPEC_DETAILS>
                                        <!--Optional:-->
                                        <tem:I_LONGITUDE>${body_create_project.I_LONGITUDE}</tem:I_LONGITUDE>
                                        <!--Optional:-->
                                        <tem:I_WEBSITE_URL>${body_create_project.I_WEBSITE_URL}</tem:I_WEBSITE_URL>
                                        <!--Optional:-->
                                        <tem:I_BRANCH>${body_create_project.I_BRANCH}</tem:I_BRANCH>
                                        <!--Optional:-->
                                        <tem:I_REMARK>${body_create_project.I_REMARK}</tem:I_REMARK>
                                        <!--Optional:-->
                                        <tem:I_IS_MORTGAGE_BY_OTH_ST>${body_create_project.I_IS_MORTGAGE_BY_OTH_ST}</tem:I_IS_MORTGAGE_BY_OTH_ST>
                                        <!--Optional:-->
                                        <tem:I_FINANCIAL_INST>${body_create_project.I_FANCIAL_ST}</tem:I_FINANCIAL_INST>
                                        <!--Optional:-->
                                        <tem:I_CTS_NO>${body_create_project.I_CTS_NO}</tem:I_CTS_NO>
                                        <!--Optional:-->
                                        <tem:Token>${this.token}</tem:Token>
                                      </tem:Create_project>
                                  </soapenv:Body>
                                </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/Create_project';
    let result_tag = 'Create_projectResult';
    this.shared.getData(soapaction, body_draft_xml, result_tag).subscribe(
      (data) => {
        if (data.O_Project_id) {
          this.shared.projectId(data.O_Project_id);
          $('#pills-tabContent > .active').next().addClass('active').prev().removeClass('active')
          $('#pills-tab > li > .active').parent('li').next().children('a').addClass('active').parent().prev().children().removeClass('active');
        }
        console.log(data);
      }
    );
      
    }
  }

  draftProject(data) {
    console.log(data);
    let project_detail = JSON.parse(localStorage.getItem('project_detail'));
    let address_detail = JSON.parse(localStorage.getItem('address_detail'));
    console.log(this.draft_data);
    let body_draft_project = {
      I_DRAFT_ID: this.draft_data ? this.draft_data.DRAFT_ID : 0,
      BUILDERID: this.builder_id,
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
      CREATEBY: this.builder_id,
      UPDATEDBY: 0,
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

    let body_draft_xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                  <soapenv:Header/>
                                  <soapenv:Body>
                                      <tem:P_draft_project>
                                        <!--Optional:-->
                                        <tem:I_DRAFT_ID>${body_draft_project.I_DRAFT_ID}</tem:I_DRAFT_ID>
                                        <!--Optional:-->
                                        <tem:BUILDERID>${body_draft_project.BUILDERID}</tem:BUILDERID>
                                        <!--Optional:-->
                                        <tem:BLDRGRPId></tem:BLDRGRPId>
                                        <!--Optional:-->
                                        <tem:Project_Name>${body_draft_project.Project_Name}</tem:Project_Name>
                                        <!--Optional:-->
                                        <tem:Project_address>${body_draft_project.Project_address}</tem:Project_address>
                                        <!--Optional:-->
                                        <tem:I_Plot_Bearing_No></tem:I_Plot_Bearing_No>
                                        <!--Optional:-->
                                        <tem:Address_Line>${body_draft_project.Address_Line}</tem:Address_Line>
                                        <!--Optional:-->
                                        <tem:Locations>${body_draft_project.Locations}</tem:Locations>
                                        <!--Optional:-->
                                        <tem:City_District>${body_draft_project.City_District}</tem:City_District>
                                        <!--Optional:-->
                                        <tem:State>${body_draft_project.State}</tem:State>
                                        <!--Optional:-->
                                        <tem:Pin_code>${body_draft_project.Pin_code}</tem:Pin_code>
                                        <!--Optional:-->
                                        <tem:latlong>${body_draft_project.latlong}</tem:latlong>
                                        <!--Optional:-->
                                        <tem:Project_Staus>${body_draft_project.Project_Staus}</tem:Project_Staus>
                                        <!--Optional:-->
                                        <tem:Project_Type>${body_draft_project.Project_Type}</tem:Project_Type>
                                        <!--Optional:-->
                                        <tem:Project_Launch_Date>${body_draft_project.Project_Launch_Date}</tem:Project_Launch_Date>
                                        <!--Optional:-->
                                        <tem:Work_commencement_date>${body_draft_project.Work_commencement_date}</tem:Work_commencement_date>
                                        <!--Optional:-->
                                        <tem:Proposed_Actl_comption_date>${body_draft_project.Proposed_Actl_comption_date}</tem:Proposed_Actl_comption_date>
                                        <!--Optional:-->
                                        <tem:Plan_approval_Authority>${body_draft_project.Plan_approval_Authority}</tem:Plan_approval_Authority>
                                        <!--Optional:-->
                                        <tem:Project_Cost>${body_draft_project.Project_Cost}</tem:Project_Cost>
                                        <!--Optional:-->
                                        <tem:I_IS_APPROVED_BY_OTH_INST>${body_draft_project.I_IS_APPROVED_BY_OTH_INST}</tem:I_IS_APPROVED_BY_OTH_INST>
                                        <!--Optional:-->
                                        <tem:I_CLPS_NO>${body_draft_project.I_CLPS_NO}</tem:I_CLPS_NO>
                                        <!--Optional:-->
                                        <tem:I_PLOT_AREA>${body_draft_project.I_PLOT_AREA}</tem:I_PLOT_AREA>
                                        <!--Optional:-->
                                        <tem:I_REQ_CONST_FIN>${body_draft_project.I_REQ_CONST_FIN}</tem:I_REQ_CONST_FIN>
                                        <!--Optional:-->
                                        <tem:I_TOTAL_NO_OF_BLD>${body_draft_project.I_TOTAL_NO_OF_BLD}</tem:I_TOTAL_NO_OF_BLD>
                                        <!--Optional:-->
                                        <tem:I_TOTAL_UNIT_BOOKD>${body_draft_project.I_TOTAL_UNIT_BOOKD}</tem:I_TOTAL_UNIT_BOOKD>
                                        <!--Optional:-->
                                        <tem:I_TOTAL_UNIT_PROPOSD>${body_draft_project.I_TOTAL_UNIT_PROPOSD}</tem:I_TOTAL_UNIT_PROPOSD>
                                        <!--Optional:-->
                                        <tem:PROJECT_CATEGORY>${body_draft_project.PROJECT_CATEGORY}</tem:PROJECT_CATEGORY>
                                        <!--Optional:-->
                                        <tem:I_PROJ_COMP_DATE>${body_draft_project.I_PROJ_COMP_DATE}</tem:I_PROJ_COMP_DATE>
                                        <!--Optional:-->
                                        <tem:I_STAGE_OF_CONST>${body_draft_project.I_STAGE_OF_CONST}</tem:I_STAGE_OF_CONST>
                                        <!--Optional:-->
                                        <tem:I_DEVELOPER_NAME>${body_draft_project.I_DEVELOPER_NAME}</tem:I_DEVELOPER_NAME>
                                        <!--Optional:-->
                                        <tem:I_PLOT_NO>${body_draft_project.I_PLOT_NO}</tem:I_PLOT_NO>
                                        <!--Optional:-->
                                        <tem:Purpose>${body_draft_project.Purpose}</tem:Purpose>
                                        <!--Optional:-->
                                        <tem:Token_Id>${body_draft_project.Token_Id}</tem:Token_Id>
                                        <!--Optional:-->
                                        <tem:IP>${body_draft_project.IP}</tem:IP>
                                        <!--Optional:-->
                                        <tem:CREATEBY>${body_draft_project.CREATEBY}</tem:CREATEBY>
                                        <!--Optional:-->
                                        <tem:UPDATEDBY>${body_draft_project.UPDATEDBY}</tem:UPDATEDBY>
                                        <!--Optional:-->
                                        <tem:I_BOUNDARY_DET_EAST>${body_draft_project.I_BOUNDARY_DET_EAST}</tem:I_BOUNDARY_DET_EAST>
                                        <!--Optional:-->
                                        <tem:I_BOUNDARY_DET_WEST>${body_draft_project.I_BOUNDARY_DET_WEST}</tem:I_BOUNDARY_DET_WEST>
                                        <!--Optional:-->
                                        <tem:I_BOUNDARY_DET_SOUTH>${body_draft_project.I_BOUNDARY_DET_SOUTH}</tem:I_BOUNDARY_DET_SOUTH>
                                        <!--Optional:-->
                                        <tem:I_BOUNDARY_DET_NORTH>${body_draft_project.I_BOUNDARY_DET_NORTH}</tem:I_BOUNDARY_DET_NORTH>
                                        <!--Optional:-->
                                        <tem:I_RESIDENTIAL_PROPOSED_UNIT>${body_draft_project.I_RESIDENTIAL_PROPOSED_UNIT}</tem:I_RESIDENTIAL_PROPOSED_UNIT>
                                        <!--Optional:-->
                                        <tem:I_RESIDENTIAL_AVAIL_FOR_SALE>${body_draft_project.I_RESIDENTIAL_AVAIL_FOR_SALE}</tem:I_RESIDENTIAL_AVAIL_FOR_SALE>
                                        <!--Optional:-->
                                        <tem:I_RESIDENTIAL_SOLD_UNIT>${body_draft_project.I_RESIDENTIAL_SOLD_UNIT}</tem:I_RESIDENTIAL_SOLD_UNIT>
                                        <!--Optional:-->
                                        <tem:I_RESIDENTIAL_RATE_SQFT>${body_draft_project.I_RESIDENTIAL_RATE_SQFT}</tem:I_RESIDENTIAL_RATE_SQFT>
                                        <!--Optional:-->
                                        <tem:I_RESIDENTIAL_AREA_UNIT>${body_draft_project.I_RESIDENTIAL_AREA_UNIT}</tem:I_RESIDENTIAL_AREA_UNIT>
                                        <!--Optional:-->
                                        <tem:I_COMMERTIAL_PROPOSED_UNIT>${body_draft_project.I_COMMERTIAL_PROPOSED_UNIT}</tem:I_COMMERTIAL_PROPOSED_UNIT>
                                        <!--Optional:-->
                                        <tem:I_COMMERTIAL_AVAIL_FOR_SALE>${body_draft_project.I_COMMERTIAL_AVAIL_FOR_SALE}</tem:I_COMMERTIAL_AVAIL_FOR_SALE>
                                        <!--Optional:-->
                                        <tem:I_COMMERTIAL_SOLD_UNIT>${body_draft_project.I_COMMERTIAL_SOLD_UNIT}</tem:I_COMMERTIAL_SOLD_UNIT>
                                        <!--Optional:-->
                                        <tem:I_COMMERTIAL_RATE_SQFT>${body_draft_project.I_COMMERTIAL_RATE_SQFT}</tem:I_COMMERTIAL_RATE_SQFT>
                                        <!--Optional:-->
                                        <tem:I_COMMERTIAL_AREA_UNIT>${body_draft_project.I_COMMERTIAL_AREA_UNIT}</tem:I_COMMERTIAL_AREA_UNIT>
                                        <!--Optional:-->
                                        <tem:I_PLOTS_PROPOSED_UNIT>${body_draft_project.I_PLOTS_PROPOSED_UNIT}</tem:I_PLOTS_PROPOSED_UNIT>
                                        <!--Optional:-->
                                        <tem:I_PLOTS_AVAIL_FOR_SALE>${body_draft_project.I_PLOTS_AVAIL_FOR_SALE}</tem:I_PLOTS_AVAIL_FOR_SALE>
                                        <!--Optional:-->
                                        <tem:I_PLOTS_SOLD_UNIT>${body_draft_project.I_PLOTS_SOLD_UNIT}</tem:I_PLOTS_SOLD_UNIT>
                                        <!--Optional:-->
                                        <tem:I_PLOTS_RATE_SQFT>${body_draft_project.I_PLOTS_RATE_SQFT}</tem:I_PLOTS_RATE_SQFT>
                                        <!--Optional:-->
                                        <tem:I_PLOTS_AREA_UNIT>${body_draft_project.I_PLOTS_AREA_UNIT}</tem:I_PLOTS_AREA_UNIT>
                                        <!--Optional:-->
                                        <tem:I_BUNGLOW_PROPOSED_UNIT>${body_draft_project.I_BUNGLOW_PROPOSED_UNIT}</tem:I_BUNGLOW_PROPOSED_UNIT>
                                        <!--Optional:-->
                                        <tem:I_BUNGLOW_AVAIL_FOR_SALE>${body_draft_project.I_BUNGLOW_AVAIL_FOR_SALE}</tem:I_BUNGLOW_AVAIL_FOR_SALE>
                                        <!--Optional:-->
                                        <tem:I_BUNGLOW_SOLD_UNIT>${body_draft_project.I_BUNGLOW_SOLD_UNIT}</tem:I_BUNGLOW_SOLD_UNIT>
                                        <!--Optional:-->
                                        <tem:I_BUNGLOW_RATE_SQFT>${body_draft_project.I_BUNGLOW_RATE_SQFT}</tem:I_BUNGLOW_RATE_SQFT>
                                        <!--Optional:-->
                                        <tem:I_BUNGLOW_AREA_UNIT>${body_draft_project.I_BUNGLOW_AREA_UNIT}</tem:I_BUNGLOW_AREA_UNIT>
                                        <!--Optional:-->
                                        <tem:I_POPULAR_LANDMARK>${body_draft_project.I_POPULAR_LANDMARK}</tem:I_POPULAR_LANDMARK>
                                        <!--Optional:-->
                                        <tem:I_TOTAL_BUILT_UP_AREA_SQMT>${body_draft_project.I_TOTAL_BUILT_UP_AREA_SQMT}</tem:I_TOTAL_BUILT_UP_AREA_SQMT>
                                        <!--Optional:-->
                                        <tem:I_UNITS_ALLOTED_TO_LANDOWN>${body_draft_project.I_UNITS_ALLOTED_TO_LANDOWN}</tem:I_UNITS_ALLOTED_TO_LANDOWN>
                                        <!--Optional:-->
                                        <tem:I_LANDOWN_SPEC_DETAILS>${body_draft_project.I_LANDOWN_SPEC_DETAILS}</tem:I_LANDOWN_SPEC_DETAILS>
                                        <!--Optional:-->
                                        <tem:I_LONGITUDE>${body_draft_project.I_LONGITUDE}</tem:I_LONGITUDE>
                                        <!--Optional:-->
                                        <tem:I_WEBSITE_URL>${body_draft_project.I_WEBSITE_URL}</tem:I_WEBSITE_URL>
                                        <!--Optional:-->
                                        <tem:I_BRANCH>${body_draft_project.I_BRANCH}</tem:I_BRANCH>
                                        <!--Optional:-->
                                        <tem:I_REMARK>${body_draft_project.I_REMARK}</tem:I_REMARK>
                                        <!--Optional:-->
                                        <tem:I_IS_MORTGAGE_BY_OTH_ST>${body_draft_project.I_IS_MORTGAGE_BY_OTH_ST}</tem:I_IS_MORTGAGE_BY_OTH_ST>
                                        <!--Optional:-->
                                        <tem:I_FINANCIAL_INST>${body_draft_project.I_FANCIAL_ST}</tem:I_FINANCIAL_INST>
                                        <!--Optional:-->
                                        <tem:I_CTS_NO>${body_draft_project.I_CTS_NO}</tem:I_CTS_NO>
                                        <!--Optional:-->
                                        <tem:Token>${this.token}</tem:Token>
                                      </tem:P_draft_project>
                                  </soapenv:Body>
                                </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/P_draft_project';
    let result_tag = 'P_draft_projectResult';
    this.shared.getData(soapaction, body_draft_xml, result_tag).subscribe(
      (data) => {
        if (data.O_Msg == 'Project DRAFT created.') {
          alert("Project drafted successfully");
          // location.reload();
        }
      }
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
