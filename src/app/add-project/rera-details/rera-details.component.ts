import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { SharedService } from 'src/app/services/shared.service';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import $ from 'jquery';
import { DatePipe } from '@angular/common'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponentComponent } from 'src/app/modal-component/modal-component.component';

@Component({
  selector: 'app-rera-details',
  templateUrl: './rera-details.component.html',
  styleUrls: ['./rera-details.component.css']
})

export class RERADetailsComponent implements OnInit {
  @ViewChild('name') inputName;
  rera_status_list: any = [];
  rera_detail_form: FormGroup;
  project_id: string;
  builder_id: string;
  token: string;
  app_date: boolean = true;
  reg_num: boolean = true;
  from_date: boolean = true;
  to_date: boolean = true;
  launch_date: boolean = false;
  pipe: DatePipe;
  buttonClickCount = 0;
  @ViewChild('btn') btn: ElementRef;
  @Input() draft_data: any;
  constructor(private shared: SharedService, private fb: FormBuilder, public modalService: NgbModal) {
    this.pipe = new DatePipe('en-US');
  }

  ngOnInit(): void {
    this.builder_id = localStorage.getItem("builder_id");
    this.token = localStorage.getItem("auth-token")
    this.rera_detail_form = this.fb.group({
      'rera_regi_status': ['', Validators.required],
      'rera_app_date': [''],
      'rera_regi_number': [''],
      'valid_from_date': [''],
      'valid_to_date': [''],
      'project_launch_date': [''],
      'remark': [''],
    });

    this.shared.project_id.subscribe(
      (res) => {
        this.project_id = res;
        console.log('pId',this.project_id);
      }
    )

    setTimeout(() => {
      this.getReraStatus();
    }, 2000);
  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log('value changed', this.draft_data);
    this.rera_detail_form.controls['rera_regi_status'].setValue(this.draft_data.I_RERA_APPL_STAT);
    this.rera_detail_form.controls['rera_app_date'].setValue(this.draft_data.I_RERA_APPLN_DATE);
    this.rera_detail_form.controls['rera_regi_number'].setValue(this.draft_data.I_RERA_APPLN_NO);
    this.rera_detail_form.controls['valid_from_date'].setValue(this.shared.stringToDate(this.draft_data.I_VALID_FROM_DATE));
    this.rera_detail_form.controls['valid_to_date'].setValue(this.shared.stringToDate(this.draft_data.I_VALID_TO_DATE));
    this.rera_detail_form.controls['project_launch_date'].setValue(this.shared.stringToDate(this.draft_data.I_RERA_APPRVL_DATE));
    this.rera_detail_form.controls['remark'].setValue(this.shared.stringToDate(this.draft_data.I_RERA_REMARK));
   // console.log(this.project_detail_form);
  }


  getReraStatus() {
    let body_rera_status = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                  <soapenv:Header/>
                                  <soapenv:Body>
                                    <tem:Get_MASTER_DATA>
                                        <!--Optional:-->
                                        <tem:I_CD_VAL>RERA_STATUS</tem:I_CD_VAL>
                                        <!--Optional:-->
                                        <tem:Token>${this.token}</tem:Token>
                                    </tem:Get_MASTER_DATA>
                                  </soapenv:Body>
                              </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/Get_MASTER_DATA';
    let result_tag = 'Get_MASTER_DATAResult';
    this.shared.getData(soapaction, body_rera_status, result_tag).subscribe(
      (data) => {
        this.rera_status_list = data.Table;
        console.log(this.rera_status_list);
      }
    );
  }

  reraStatusChange(event) {


    let status = event.value;
    console.log(status)
    const rera_app_date = this.rera_detail_form.get('rera_app_date')
    const valid_from_date = this.rera_detail_form.get('valid_from_date')
    const valid_to_date = this.rera_detail_form.get('valid_to_date')
    const rera_regi_number = this.rera_detail_form.get('rera_regi_number')
    if (status == "Registered") {

      rera_app_date.reset();
      rera_regi_number.reset();
      valid_from_date.reset();
      valid_to_date.reset();

      this.from_date = false;
      this.to_date = false;
      this.reg_num = false;
      this.app_date = true;

      rera_app_date.clearValidators()
      rera_app_date.updateValueAndValidity();

      valid_from_date.setValidators(Validators.required);
      valid_from_date.updateValueAndValidity()

      valid_to_date.setValidators(Validators.required);
      valid_to_date.updateValueAndValidity()

      rera_regi_number.setValidators([Validators.required]);
      rera_regi_number.updateValueAndValidity();
    } else if (status == "Applied") {

      rera_app_date.reset();
      rera_regi_number.reset();
      valid_from_date.reset();
      valid_to_date.reset();

      this.from_date = true;
      this.to_date = true;
      this.reg_num = true;
      this.app_date = false;

      rera_app_date.setValidators([Validators.required]);
      rera_app_date.updateValueAndValidity();

      valid_from_date.clearValidators();
      valid_from_date.updateValueAndValidity()

      valid_to_date.clearValidators();
      valid_to_date.updateValueAndValidity()

      rera_regi_number.clearValidators();
      rera_regi_number.updateValueAndValidity();

    } else {
      this.from_date = true;
      this.to_date = true;
      this.reg_num = true;
      this.app_date = true;
      this.reg_num = true;

      rera_app_date.reset();
      rera_regi_number.reset();
      valid_from_date.reset();
      valid_to_date.reset();

      rera_app_date.clearValidators();
      rera_app_date.updateValueAndValidity();

      rera_regi_number.clearValidators();
      rera_regi_number.updateValueAndValidity();

      valid_from_date.clearValidators();
      valid_from_date.updateValueAndValidity();

      valid_to_date.clearValidators();
      valid_to_date.updateValueAndValidity();
    }

  }

  submitReraDetail(data) {

    const messageArr = [];
    messageArr.push("<ul>")
    Object.keys(this.rera_detail_form.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.rera_detail_form.get(key).errors;
      if (controlErrors != null) {

        Object.keys(controlErrors).forEach((keyError) => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);

          if(keyError=="pattern"){
            messageArr.push("<li>" + key.replace(/_/g, ' ') + " is invalid or if '&' symbol is not allowed</li>");
          }else{
            messageArr.push("<li>" + key.replace(/_/g, ' ') + " is " + keyError + "</li>");
          }

        });

      }
    });

    messageArr.push("</ul>");

    if (messageArr.length > 2) {
      this.openModal(messageArr)
    }

    data.rera_app_date = data.rera_app_date ? this.pipe.transform(data.rera_app_date, 'dd-MMM-yyyy') : '';
    data.project_launch_date = data.project_launch_date ? this.pipe.transform(data.project_launch_date, 'dd-MMM-yyyy') : '';
    data.valid_from_date = data.valid_from_date ? this.pipe.transform(data.valid_from_date, 'dd-MMM-yyyy') : '';
    data.valid_to_date = data.valid_to_date ? this.pipe.transform(data.valid_to_date, 'dd-MMM-yyyy') : '';
    if (this.rera_detail_form.valid) {

      // this.btn.nativeElement.disabled = true;

      let body_rera_submit = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
        <soapenv:Header/>
        <soapenv:Body>
          <tem:Insert_Rera_details>
              <!--Optional:-->
              <tem:I_PROJECT_NO>${this.project_id}</tem:I_PROJECT_NO>
              <!--Optional:-->
              <tem:I_RERA_APPL_STAT>${data.rera_regi_status}</tem:I_RERA_APPL_STAT>
              <!--Optional:-->
              <tem:I_RERA_APPLN_NO>${data.rera_regi_number}</tem:I_RERA_APPLN_NO>
              <!--Optional:-->
              <tem:I_RERA_APPLN_DATE>${data.rera_app_date}</tem:I_RERA_APPLN_DATE>
              <!--Optional:-->
              <tem:I_RERA_REMARK>${data.remark}</tem:I_RERA_REMARK>
              <!--Optional:-->
              <tem:I_PROJ_CERT_SRNO></tem:I_PROJ_CERT_SRNO>
              <!--Optional:-->
              <tem:I_RERA_APPRVL_DATE>${data.project_launch_date}</tem:I_RERA_APPRVL_DATE>
              <!--Optional:-->
              <tem:I_VALID_FROM_DATE>${data.valid_from_date}</tem:I_VALID_FROM_DATE>
              <!--Optional:-->
              <tem:I_VALID_TO_DATE>${data.valid_to_date}</tem:I_VALID_TO_DATE>
              <!--Optional:-->
              <tem:i_created_by>${this.builder_id}</tem:i_created_by>
              <!--Optional:-->
              <tem:Token>${this.token}</tem:Token>
          </tem:Insert_Rera_details>
        </soapenv:Body>
    </soapenv:Envelope>`;

      let soapaction = 'http://tempuri.org/IService1/Insert_Rera_details';
      let result_tag = 'Insert_Rera_detailsResult';
      this.shared.getData(soapaction, body_rera_submit, result_tag).subscribe(
        (data) => {
          if (data == 'Success') {
            this.shared.sharedTab3.tab = false;

            $('#pills-tabContent > .active').next().addClass('active').prev().removeClass('active')
            $('#pills-tab > li > .active').parent('li').next().children('a').addClass('active').parent().prev().children().removeClass('active');
            this.btn.nativeElement.disabled = false;
          }
          console.log(data);

        }
      );


    }

  }

  openModal(name) {
    const str = name.join().replace(/,/g, '');
    const modalRef = this.modalService.open(ModalComponentComponent, { size: 'sm' });
    modalRef.componentInstance.name = str;

  }

  log() {
    console.log("click");
  }


  draftProject(data) {
    console.log(data);
    let project_detail = JSON.parse(localStorage.getItem('project_detail'));
    let address_detail = JSON.parse(localStorage.getItem('address_detail'));
    let project_feature = JSON.parse(localStorage.getItem('project_feature'));
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
      Plan_approval_Authority: project_feature.plan_approval_auth_name,
      Project_Cost: project_feature.project_cost,
      I_IS_APPROVED_BY_OTH_INST: '',
      I_CLPS_NO: project_feature.hdfc_clip_no,
      I_PLOT_AREA: project_feature.plot_area,
      I_REQ_CONST_FIN: project_feature.contruction_finance,
      I_TOTAL_NO_OF_BLD: project_feature.total_no_of_building,
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
      I_RESIDENTIAL_PROPOSED_UNIT: project_feature.residencial_total_unit,
      I_RESIDENTIAL_AVAIL_FOR_SALE: project_feature.residencial_available_sale,
      I_RESIDENTIAL_SOLD_UNIT: project_feature.residencial_solid_unit,
      I_RESIDENTIAL_RATE_SQFT: project_feature.residencial_rate_per_sqft,
      I_RESIDENTIAL_AREA_UNIT: project_feature.residencial_area_unit,
      I_COMMERTIAL_PROPOSED_UNIT: project_feature.commercial_total_unit,
      I_COMMERTIAL_AVAIL_FOR_SALE: project_feature.commercial_available_sale,
      I_COMMERTIAL_SOLD_UNIT: project_feature.commercial_solid_unit,
      I_COMMERTIAL_RATE_SQFT: project_feature.commercial_rate_per_sqft,
      I_COMMERTIAL_AREA_UNIT: project_feature.commercial_area_unit,
      I_PLOTS_PROPOSED_UNIT: project_feature.plot_total_unit,
      I_PLOTS_AVAIL_FOR_SALE: project_feature.plot_available_sale,
      I_PLOTS_SOLD_UNIT: project_feature.plot_solid_unit,
      I_PLOTS_RATE_SQFT: project_feature.plot_rate_per_sqft,
      I_PLOTS_AREA_UNIT: project_feature.plot_area_unit,
      I_BUNGLOW_PROPOSED_UNIT: project_feature.bungalow_total_unit,
      I_BUNGLOW_AVAIL_FOR_SALE: project_feature.bungalow_available_sale,
      I_BUNGLOW_SOLD_UNIT: project_feature.bungalow_solid_unit,
      I_BUNGLOW_RATE_SQFT: project_feature.bungalow_rate_per_sqft,
      I_BUNGLOW_AREA_UNIT: project_feature.bungalow_area_unit,
      I_POPULAR_LANDMARK: address_detail.popular_landmark,
      I_TOTAL_BUILT_UP_AREA_SQMT: project_feature.total_buildup_area,
      I_UNITS_ALLOTED_TO_LANDOWN: project_feature.total_number,
      I_LANDOWN_SPEC_DETAILS: project_feature.mention_specfic_detail,
      I_LONGITUDE: address_detail.long,
      I_BRANCH: project_detail.hdfc_branch,
      I_REMARK: project_detail.remark,
      I_IS_MORTGAGE_BY_OTH_ST: project_feature.mortgaged,
      I_FANCIAL_ST: project_feature.financial_institute == "HDFC" ? project_feature.financial_institute : project_feature.bank_name,
      I_CTS_NO: address_detail.sno,
      I_RERA_APPL_STAT:data.rera_regi_status,
      I_RERA_APPLN_NO:data.rera_regi_number,
      I_RERA_APPLN_DATE:data.rera_app_date,
      I_RERA_REMARK:data.remark,
      I_RERA_APPRVL_DATE:data.project_launch_date,
      I_VALID_FROM_DATE:data.valid_from_date,
      I_VALID_TO_DATE:data.valid_to_date,
      Token: this.token
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
                                        <tem:I_RERA_APPL_STAT>${body_draft_project.I_RERA_APPL_STAT}</tem:I_RERA_APPL_STAT>
                                        <!--Optional:-->
                                        <tem:I_RERA_APPLN_NO>${body_draft_project.I_RERA_APPLN_NO}</tem:I_RERA_APPLN_NO>
                                        <!--Optional:-->
                                        <tem:I_RERA_APPLN_DATE>${body_draft_project.I_RERA_APPLN_DATE}</tem:I_RERA_APPLN_DATE>
                                        <!--Optional:-->
                                        <tem:I_RERA_REMARK>${body_draft_project.I_RERA_REMARK}</tem:I_RERA_REMARK>
                                        <!--Optional:-->
                                        <tem:I_RERA_APPRVL_DATE>${body_draft_project.I_RERA_APPRVL_DATE}</tem:I_RERA_APPRVL_DATE>
                                        <!--Optional:-->
                                        <tem:I_VALID_FROM_DATE>${body_draft_project.I_VALID_FROM_DATE}</tem:I_VALID_FROM_DATE>
                                        <!--Optional:-->
                                        <tem:I_VALID_TO_DATE>${body_draft_project.I_VALID_TO_DATE}</tem:I_VALID_TO_DATE>
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
          alert("Project draft saved successfully");
          // location.reload();
        }
      }
    );

  }
}
