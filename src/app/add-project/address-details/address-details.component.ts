import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { ISoapMethodResponse } from 'ngx-soap';
import { SharedService } from 'src/app/services/shared.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import $ from 'jquery';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.css']
})
export class AddressDetailsComponent implements OnInit {
  state_list: any = [];
  state: any;
  city_list: any = [];
  address_detail_form: FormGroup;
  @Input() draft_data: any;
  constructor(private shared: SharedService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.address_detail_form = this.fb.group({
      'sno': [''],
      'plot_no': [''],
      'address': ['', Validators.required],
      'popular_landmark': ['', Validators.required],
      'location': ['', Validators.required],
      'state': ['', Validators.required],
      'city': ['', Validators.required],
      'pincode': ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      'lat': ['', Validators.required],
      'long': ['', Validators.required],
      'east': ['', Validators.required],
      'west': ['', Validators.required],
      'north': ['', Validators.required],
      'south': ['', Validators.required],
    })
    setTimeout(() => {
      this.getState();
    }, 2000);
  }

  getState() {
    let body_Get_all_state = { Token: 'MH3NPYK34J0KHDI' };
    (<any>this.shared.client).Get_all_state(body_Get_all_state).subscribe(
      (res: ISoapMethodResponse) => {
        console.log('method response', res);
        let xmlResponse = res.xml;
        let result = res.result.Get_all_stateResult;

        var result_json = JSON.parse(result)

        this.state_list = result_json.Table;
        console.log(this.state_list);


      },
      err => console.log(err)
    );
  }
  stateChange(event) {
    this.state = event.value;
    let body_get_city = { City: this.state, Token: 'MH3NPYK34J0KHDI' };

    (<any>this.shared.client).GET_CITY(body_get_city).subscribe(
      (res: ISoapMethodResponse) => {
        console.log('method response', res);
        let xmlResponse = res.xml;
        let result = res.result.GET_CITYResult;

        var result_json = JSON.parse(result)

        this.city_list = result_json.Table;

        console.log(this.city_list);
      },
      err => console.log(err)
    );
  }

  submitAddressDetail(data) {
    console.log(data);
    if (this.address_detail_form.valid) {
      $('#pills-tabContent > .active').next().addClass('active').prev().removeClass('active')
      $('#pills-tab > li > .active').parent('li').next().children('a').addClass('active').parent().prev().children().removeClass('active');

      localStorage.setItem('address_detail', JSON.stringify(data));
    }

  }

  draftProject(data) {
    console.log(data);
    let project_detail = JSON.parse(localStorage.getItem('project_detail'));
    let project_feature = JSON.parse(localStorage.getItem('project_feature'));
    project_feature = project_feature ? project_feature : {};
    console.log(this.draft_data);
    let body_draft_project = {
      I_DRAFT_ID: this.draft_data ? this.draft_data.DRAFT_ID : null,
      BUILDERID: '510673',
      BLDRGRPId: '',
      Project_Name: project_detail.project_name,
      Project_address: data.address,
      I_WEBSITE_URL: project_detail.website,
      Address_Line: data.address,
      Locations: data.location,
      City_District: data.city,
      State: data.state,
      Pin_code: data.pincode,
      latlong: data.lat + ',' + data.long,
      Project_Staus: '',
      Project_Type: project_detail.project_type,
      Project_Launch_Date: project_detail.project_launch_date,
      Work_commencement_date: project_detail.work_comm_date,
      Proposed_Actl_comption_date: project_detail.expected_comp_date,
      Plan_approval_Authority: project_feature.plan_approval_auth_name ? project_feature.plan_approval_auth_name : '',
      Project_Cost: project_feature.project_cost ? project_feature.project_cost : '',
      I_IS_APPROVED_BY_OTH_INST: '',
      I_CLPS_NO: project_feature.hdfc_clip_no ? project_feature.hdfc_clip_no : '',
      I_PLOT_AREA: project_feature.plot_area ? project_feature.plot_area : '',
      I_REQ_CONST_FIN: project_feature.contruction_finance ? project_feature.contruction_finance : '',
      I_TOTAL_NO_OF_BLD: project_feature.total_no_of_building ? project_feature.total_no_of_building : '',
      I_TOTAL_UNIT_BOOKD: '',
      I_TOTAL_UNIT_PROPOSD: '',
      PROJECT_CATEGORY: project_detail.project_category,
      I_PROJ_COMP_DATE: project_detail.expected_comp_date,
      I_STAGE_OF_CONST: project_detail.stage_of_construction,
      I_DEVELOPER_NAME: project_detail.developer_name,
      I_PLOT_NO: data.plot_no,
      Purpose: '',
      Token_Id: '',
      IP: '',
      CREATEBY: '510673',
      UPDATEDBY: '',
      I_BOUNDARY_DET_EAST: data.east,
      I_BOUNDARY_DET_WEST: data.west,
      I_BOUNDARY_DET_SOUTH: data.south,
      I_BOUNDARY_DET_NORTH: data.north,
      I_RESIDENTIAL_PROPOSED_UNIT: project_feature.residencial_total_unit ? project_feature.residencial_total_unit : '',
      I_RESIDENTIAL_AVAIL_FOR_SALE: project_feature.residencial_available_sale ? project_feature.residencial_available_sale : '',
      I_RESIDENTIAL_SOLD_UNIT: project_feature.residencial_solid_unit ? project_feature.residencial_solid_unit : '',
      I_RESIDENTIAL_RATE_SQFT: project_feature.residencial_rate_per_sqft ? project_feature.residencial_rate_per_sqft : '',
      I_RESIDENTIAL_AREA_UNIT: project_feature.residencial_area_unit ? project_feature.residencial_area_unit : '',
      I_COMMERTIAL_PROPOSED_UNIT: project_feature.commercial_total_unit ? project_feature.commercial_total_unit : '',
      I_COMMERTIAL_AVAIL_FOR_SALE: project_feature.commercial_available_sale ? project_feature.commercial_available_sale : '',
      I_COMMERTIAL_SOLD_UNIT: project_feature.commercial_solid_unit ? project_feature.commercial_solid_unit : '',
      I_COMMERTIAL_RATE_SQFT: project_feature.commercial_rate_per_sqft ? project_feature.commercial_rate_per_sqft : '',
      I_COMMERTIAL_AREA_UNIT: project_feature.commercial_area_unit ? project_feature.commercial_area_unit : '',
      I_PLOTS_PROPOSED_UNIT: project_feature.plot_total_unit ? project_feature.plot_total_unit : '',
      I_PLOTS_AVAIL_FOR_SALE: project_feature.plot_available_sale ? project_feature.plot_available_sale : '',
      I_PLOTS_SOLD_UNIT: project_feature.plot_solid_unit ? project_feature.plot_solid_unit : '',
      I_PLOTS_RATE_SQFT: project_feature.plot_rate_per_sqft ? project_feature.plot_rate_per_sqft : '',
      I_PLOTS_AREA_UNIT: project_feature.plot_area_unit ? project_feature.plot_area_unit : '',
      I_BUNGLOW_PROPOSED_UNIT: project_feature.bungalow_total_unit ? project_feature.bungalow_total_unit : '',
      I_BUNGLOW_AVAIL_FOR_SALE: project_feature.bungalow_available_sale ? project_feature.bungalow_available_sale : '',
      I_BUNGLOW_SOLD_UNIT: project_feature.bungalow_solid_unit ? project_feature.bungalow_solid_unit : '',
      I_BUNGLOW_RATE_SQFT: project_feature.bungalow_rate_per_sqft ? project_feature.bungalow_rate_per_sqft : '',
      I_BUNGLOW_AREA_UNIT: project_feature.bungalow_area_unit ? project_feature.bungalow_area_unit : '',
      I_POPULAR_LANDMARK: data.popular_landmark,
      I_TOTAL_BUILT_UP_AREA_SQMT: project_feature.total_buildup_area ? project_feature.total_buildup_area : '',
      I_UNITS_ALLOTED_TO_LANDOWN: project_feature.total_number ? project_feature.total_number : '',
      I_LANDOWN_SPEC_DETAILS: project_feature.mention_specfic_detail ? project_feature.mention_specfic_detail : '',
      I_LONGITUDE: data.long,
      I_BRANCH: project_detail.hdfc_branch,
      I_REMARK: project_detail.remark,
      I_IS_MORTGAGE_BY_OTH_ST: project_feature.mortgaged ? project_feature.mortgaged : '',
      I_FANCIAL_ST: project_feature.financial_institute ? project_feature.financial_institute : '',
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
    this.address_detail_form.controls['sno'].setValue(this.draft_data.PROJECT_NAME);
    this.address_detail_form.controls['plot_no'].setValue(this.draft_data.PLOT_NO);
    this.address_detail_form.controls['address'].setValue(this.draft_data.ADDRESS_LINE);
    this.address_detail_form.controls['popular_landmark'].setValue(this.draft_data.POPULAR_LANDMARK);
    this.address_detail_form.controls['location'].setValue(this.draft_data.LOCATIONS);
    this.address_detail_form.controls['state'].setValue(this.draft_data.STATE);
    this.address_detail_form.controls['city'].setValue(this.draft_data.CITY_DISTRICT);
    this.address_detail_form.controls['pincode'].setValue(this.draft_data.PIN_CODE);
    this.address_detail_form.controls['lat'].setValue(this.draft_data.LATLONG);
    this.address_detail_form.controls['long'].setValue(this.draft_data.LATLONG);
    this.address_detail_form.controls['east'].setValue(this.draft_data.BOUNDARY_DET_EAST);
    this.address_detail_form.controls['west'].setValue(this.draft_data.BOUNDARY_DET_WEST);
    this.address_detail_form.controls['north'].setValue(this.draft_data.BOUNDARY_DET_NORTH);
    this.address_detail_form.controls['south'].setValue(this.draft_data.BOUNDARY_DET_SOUTH);
  }

}
