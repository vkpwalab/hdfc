import { Component, OnInit, SimpleChanges, Input } from '@angular/core';

import { SharedService } from 'src/app/services/shared.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import $ from 'jquery';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { } from 'googlemaps';
import { LatLng } from '@agm/core';
import { GoogleMap } from '@agm/core/services/google-maps-types';

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
  @Input() latlong: any;
  builder_id: string;
  token: string;
  myMarker!: any;

  closeResult = '';
  map: google.maps.Map;

  constructor(private shared: SharedService, private fb: FormBuilder, public modalService: NgbModal) { }

  ngOnInit(): void {
    this.builder_id = '510673';
    this.token = 'MH3NPYK34J0KHDI';
    this.address_detail_form = this.fb.group({
      'sno': [''],
      'plot_no': [''],
      'address': ['', Validators.required],
      'popular_landmark': ['', Validators.required],
      'location': ['', Validators.required],
      'state': ['', Validators.required],
      'city': ['', Validators.required],
      'pincode': ['', [Validators.required, Validators.pattern(/^[1-9][0-9]{5}$/)]],
      'lat': ['', Validators.required],
      'long': ['', Validators.required],
      'east': ['', Validators.required],
      'west': ['', Validators.required],
      'north': ['', Validators.required],
      'south': ['', Validators.required],
    })

    const upperAddress = [
      'sno',
      'plot_no',
      'popular_landmark',
      'location',
      'state',
      'city',
      'pincode'
    ]

    upperAddress.forEach(element => {
      console.log("changed element ", +element);
      this.address_detail_form.get(element).valueChanges.subscribe(() => {
        localStorage.removeItem("lat");
        localStorage.removeItem("lng");
      })
    });


    this.getState();
    //this.initMap();

  }

  getState() {
    let body_get_state_list = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                <soapenv:Header/>
                                <soapenv:Body>
                                  <tem:Get_all_state>
                                      <!--Optional:-->
                                      <tem:Token>${this.token}</tem:Token>
                                  </tem:Get_all_state>
                                </soapenv:Body>
                            </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/Get_all_state';
    let result_tag = 'Get_all_stateResult';
    this.shared.getData(soapaction, body_get_state_list, result_tag).subscribe(
      (data) => {
        this.state_list = data.Table;
        console.log(this.state_list);
      }
    );
  }

  stateChange(event) {
    this.state = event.value;
    let body_get_city_list = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                  <soapenv:Header/>
                                  <soapenv:Body>
                                    <tem:GET_CITY>
                                        <!--Optional:-->
                                        <tem:City>${this.state}</tem:City>
                                        <!--Optional:-->
                                        <tem:Token>${this.token}</tem:Token>
                                    </tem:GET_CITY>
                                  </soapenv:Body>
                              </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/GET_CITY';
    let result_tag = 'GET_CITYResult';
    this.shared.getData(soapaction, body_get_city_list, result_tag).subscribe(
      (data) => {
        this.city_list = data.Table;
        console.log(this.city_list);
      }
    );
  }

  submitAddressDetail(data) {
    console.log(data);
    if (this.address_detail_form.valid) {
      $('#pills-tabContent > .active').next().addClass('active').prev().removeClass('active')
      $('#pills-tab > li > .active').parent('li').next().children('a').addClass('active').parent().prev().children().removeClass('active');

      localStorage.setItem('address_detail', JSON.stringify(data));
      this.shared.sharedTab1.tab = false;

    }

  }

  draftProject(data) {
    console.log(data);
    let project_detail = JSON.parse(localStorage.getItem('project_detail'));
    let project_feature = JSON.parse(localStorage.getItem('project_feature'));
    project_feature = project_feature ? project_feature : {};
    console.log(this.draft_data);
    let body_draft_project = {
      I_DRAFT_ID: this.draft_data ? this.draft_data.DRAFT_ID : 0,
      BUILDERID: this.builder_id,
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
      CREATEBY: this.builder_id,
      UPDATEDBY: 0,
      I_BOUNDARY_DET_EAST: data.east,
      I_BOUNDARY_DET_WEST: data.west,
      I_BOUNDARY_DET_SOUTH: data.south,
      I_BOUNDARY_DET_NORTH: data.north,
      I_RESIDENTIAL_PROPOSED_UNIT: project_feature.residencial_total_unit ? project_feature.residencial_total_unit : 0,
      I_RESIDENTIAL_AVAIL_FOR_SALE: project_feature.residencial_available_sale ? project_feature.residencial_available_sale : 0,
      I_RESIDENTIAL_SOLD_UNIT: project_feature.residencial_solid_unit ? project_feature.residencial_solid_unit : 0,
      I_RESIDENTIAL_RATE_SQFT: project_feature.residencial_rate_per_sqft ? project_feature.residencial_rate_per_sqft : 0,
      I_RESIDENTIAL_AREA_UNIT: project_feature.residencial_area_unit ? project_feature.residencial_area_unit : 0,
      I_COMMERTIAL_PROPOSED_UNIT: project_feature.commercial_total_unit ? project_feature.commercial_total_unit : 0,
      I_COMMERTIAL_AVAIL_FOR_SALE: project_feature.commercial_available_sale ? project_feature.commercial_available_sale : 0,
      I_COMMERTIAL_SOLD_UNIT: project_feature.commercial_solid_unit ? project_feature.commercial_solid_unit : 0,
      I_COMMERTIAL_RATE_SQFT: project_feature.commercial_rate_per_sqft ? project_feature.commercial_rate_per_sqft : 0,
      I_COMMERTIAL_AREA_UNIT: project_feature.commercial_area_unit ? project_feature.commercial_area_unit : 0,
      I_PLOTS_PROPOSED_UNIT: project_feature.plot_total_unit ? project_feature.plot_total_unit : 0,
      I_PLOTS_AVAIL_FOR_SALE: project_feature.plot_available_sale ? project_feature.plot_available_sale : 0,
      I_PLOTS_SOLD_UNIT: project_feature.plot_solid_unit ? project_feature.plot_solid_unit : 0,
      I_PLOTS_RATE_SQFT: project_feature.plot_rate_per_sqft ? project_feature.plot_rate_per_sqft : 0,
      I_PLOTS_AREA_UNIT: project_feature.plot_area_unit ? project_feature.plot_area_unit : '',
      I_BUNGLOW_PROPOSED_UNIT: project_feature.bungalow_total_unit ? project_feature.bungalow_total_unit : 0,
      I_BUNGLOW_AVAIL_FOR_SALE: project_feature.bungalow_available_sale ? project_feature.bungalow_available_sale : 0,
      I_BUNGLOW_SOLD_UNIT: project_feature.bungalow_solid_unit ? project_feature.bungalow_solid_unit : 0,
      I_BUNGLOW_RATE_SQFT: project_feature.bungalow_rate_per_sqft ? project_feature.bungalow_rate_per_sqft : 0,
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
        console.log(data);
        if (data.O_Msg == 'Project DRAFT created.') {
          alert("Project drafted successfully");
          // location.reload();
        }
      }
    );

  }

  ngOnChanges(changes: SimpleChanges): void {

    console.log(changes);

    if (changes['draft_data'] !== undefined) {
      this.address_detail_form.controls['sno'].setValue(this.draft_data.CTS_NO);
      this.address_detail_form.controls['plot_no'].setValue(this.draft_data.PLOT_NO);
      this.address_detail_form.controls['address'].setValue(this.draft_data.ADDRESS_LINE);
      this.address_detail_form.controls['popular_landmark'].setValue(this.draft_data.POPULAR_LANDMARK);
      this.address_detail_form.controls['location'].setValue(this.draft_data.LOCATIONS);
      this.address_detail_form.controls['state'].setValue(this.draft_data.STATE);
      this.address_detail_form.controls['pincode'].setValue(this.draft_data.PIN_CODE);
      this.address_detail_form.controls['east'].setValue(this.draft_data.BOUNDARY_DET_EAST);
      this.address_detail_form.controls['west'].setValue(this.draft_data.BOUNDARY_DET_WEST);
      this.address_detail_form.controls['north'].setValue(this.draft_data.BOUNDARY_DET_NORTH);
      this.address_detail_form.controls['south'].setValue(this.draft_data.BOUNDARY_DET_SOUTH);
      let event = { value: this.draft_data.STATE };
      this.stateChange(event);
      this.address_detail_form.controls['city'].setValue(this.draft_data.CITY_DISTRICT);

      let latlng = this.draft_data.LATLONG.split(",");
      this.address_detail_form.controls['lat'].setValue(latlng[0]);
      this.address_detail_form.controls['long'].setValue(latlng[1]);
    }

    if (changes['latlong'] !== undefined) {
      this.address_detail_form.controls['lat'].setValue(this.latlong.lat);
      this.address_detail_form.controls['long'].setValue(this.latlong.lng);
      this.getAddressFromLatLng(this.latlong.lat, this.latlong.lng);
    }
  }

  getAddressFromLatLng(lat, lng) {
    let body_get_addres = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                            <soapenv:Header/>
                            <soapenv:Body>
                              <tem:Get_Addr_lat_long_addr>
                                  <!--Optional:-->
                                  <tem:latitude>${lat}</tem:latitude>
                                  <!--Optional:-->
                                  <tem:longitude>${lng}</tem:longitude>
                                  <!--Optional:-->
                                  <tem:Token>${this.token}</tem:Token>
                              </tem:Get_Addr_lat_long_addr>
                            </soapenv:Body>
                        </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/Get_Addr_lat_long_addr';
    let result_tag = 'Get_Addr_lat_long_addrResult';
    this.shared.getData(soapaction, body_get_addres, result_tag).subscribe(
      (data) => {
        console.log(data);

        console.log(data.Table);
      }
    );
  }

  open(content) {

    const sno = this.address_detail_form.get('sno');
    const plotNo = this.address_detail_form.get('plot_no');
    const address = this.address_detail_form.get('address');
    const popularLandmark = this.address_detail_form.get('popular_landmark');
    const location = this.address_detail_form.get('location');
    const state = this.address_detail_form.get('state');
    const city = this.address_detail_form.get('city');
    const pincode = this.address_detail_form.get('pincode')

    if (sno.valid && plotNo.valid && address.valid && popularLandmark.valid && location.valid && state.valid && city.valid && pincode.valid) {
      const finalAddress = sno.value + "," + plotNo.value + "," + address.value + "," + popularLandmark.value + "," + location.value + "," + state.value + "," + city.value + "," + pincode.value;
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
      this.initMap(finalAddress);
    } else {
      sno.markAsTouched()
      plotNo.markAsTouched()
      address.markAsTouched()
      popularLandmark.markAsTouched()
      location.markAsTouched()
      state.markAsTouched()
      city.markAsTouched()
      pincode.markAsTouched()
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  initMap(finalAddress: string) {
    const latFromStorage = localStorage.getItem("lat");
    const lngFromStorage = localStorage.getItem("lng");



    this.map = new google.maps.Map(
      document.getElementById("map2") as HTMLElement,
      {
        zoom: 50,
        center: { lat: 40.731, lng: -73.997 },
      }
    );

    console.log("map init called");
    const geocoder = new google.maps.Geocoder();

    this.geocodeAddress(geocoder, this.map, finalAddress, latFromStorage, lngFromStorage);
    const lat = this.address_detail_form.get('lat')
    const long = this.address_detail_form.get('long')
    this.map.addListener("click", (mapsMouseEvent) => {
      lat.setValue(mapsMouseEvent.latLng.toJSON().lat)
      long.setValue(mapsMouseEvent.latLng.toJSON().lng)
    });



  }

  geocodeAddress(
    geocoder: google.maps.Geocoder,
    resultsMap: google.maps.Map,
    finalAddress: string,
    latFromStorage: any,
    lngFromStorage: any
  ) {

    const lat = this.address_detail_form.get('lat')
    const long = this.address_detail_form.get('long')

    geocoder.geocode({ address: finalAddress }, (results, status) => {
      if (status === "OK") {
        console.log(results[0].geometry.location);

        let latVal;
        let lngVal;

        if (latFromStorage !== null && lngFromStorage !== null) {
          latVal = parseFloat(latFromStorage);
          lngVal = parseFloat(lngFromStorage);
        } else {
          latVal = results[0].geometry.location.lat();
          lngVal = results[0].geometry.location.lng()
        }

        lat.setValue(latVal)
        long.setValue(lngVal);

        resultsMap.setCenter(results[0].geometry.location);
        this.myMarker = new google.maps.Marker({
          map: resultsMap,
          draggable: true,
          position: { lat: latVal, lng: lngVal },
        });
        google.maps.event.addListener(this.myMarker, 'dragend', function (evt) {
          console.log(evt.latLng);
          localStorage.setItem("lat", evt.latLng.lat());
          localStorage.setItem("lng", evt.latLng.lng())
          lat.setValue(evt.latLng.lat())
          long.setValue(evt.latLng.lng())

        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });

  }

}
