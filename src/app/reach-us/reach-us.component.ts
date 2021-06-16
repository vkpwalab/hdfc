import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-reach-us',
  templateUrl: './reach-us.component.html',
  styleUrls: ['./reach-us.component.css']
})
export class ReachUsComponent implements OnInit {

  slide_toggle_form: FormGroup;
  reachus: FormGroup;
  project_list: any;
  project_site: string;
  project_approval: string;
  campaign_management: string;
  subvention: string;
  disbursment_facility: string;
  loan_assistance: string;
  builders_details: any;
  branch_no: any;
  reachus_project: FormGroup;
  ans: void;
  builder_id: string;
  token: string;


  constructor(private shared: SharedService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.shared.headerTitle('Reach Us');
    this.builder_id = localStorage.getItem("builder_id");
    this.token = localStorage.getItem("auth-token")

    this.reachus = this.fb.group({
      'remark_approval': [''],
      'remark_campaign': [''],
      'remark_subvention_scheme': [''],
      'remark_disbursment_facility': [''],
      'remark_home_loan': [''],
      'remark_sales_executive': [''],
      'select_project': ['', Validators.required],
      'enable_project_approval': [''],
      'enable_campaign_management': [''],
      'enable_subvention_scheme': [''],
      'enable_disbursment_facility': [''],
      'enable_loan_assistance': [''],
      'enable_sale_excutive': ['']
    })

    this.getBuilersDetails();
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
        this.builders_details = data.Table[0];
        this.branch_no = this.builders_details.BRANCH_NO;
        console.log(this.builders_details);
        this.getPacProjectList();
      }
    );
  }

  getPacProjectList() {
    let body_pac_project_list = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                  <soapenv:Header/>
                                  <soapenv:Body>
                                    <tem:Get__Pac_Project_List>
                                        <!--Optional:-->
                                        <tem:branch>${this.branch_no}</tem:branch>
                                        <!--Optional:-->
                                        <tem:I_BUILDER_ID>${this.builder_id}</tem:I_BUILDER_ID>
                                        <!--Optional:-->
                                        <tem:Token>${this.token}</tem:Token>
                                    </tem:Get__Pac_Project_List>
                                  </soapenv:Body>
                              </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/Get__Pac_Project_List';
    let result_tag = 'Get__Pac_Project_ListResult';
    this.shared.getData(soapaction, body_pac_project_list, result_tag).subscribe(
      (data) => {
        this.project_list = data.Table;
        console.log(this.project_list);
      }
    );

  }

  submitReachUsForm(data) {

      if (this.reachus.valid) {

        let body_reach_us_form = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                    <soapenv:Header/>
                                    <soapenv:Body>
                                      <tem:Insert_proj_assistance>
                                          <!--Optional:-->
                                          <tem:I_project_id>${data.select_project}</tem:I_project_id>
                                          <!--Optional:-->
                                          <tem:I_builder_id>${this.builder_id}</tem:I_builder_id>
                                          <!--Optional:-->
                                          <tem:I_proj_appr_needed>${data.remark_approval}</tem:I_proj_appr_needed>
                                          <!--Optional:-->
                                          <tem:I_camp_managment>${data.remark_campaign}</tem:I_camp_managment>
                                          <!--Optional:-->
                                          <tem:I_suventn_scheme>${data.remark_subvention_scheme}</tem:I_suventn_scheme>
                                          <!--Optional:-->
                                          <tem:I_spec_disb_facility>${data.remark_disbursment_facility}</tem:I_spec_disb_facility>
                                          <!--Optional:-->
                                          <tem:I_onsile_hmloan_assis>${data.remark_home_loan}</tem:I_onsile_hmloan_assis>
                                          <!--Optional:-->
                                          <tem:I_is_camp_managment>${data.enable_campaign_management}</tem:I_is_camp_managment>
                                          <!--Optional:-->
                                          <tem:I_is_full_time_sales>${data.enable_sale_excutive}</tem:I_is_full_time_sales>
                                          <!--Optional:-->
                                          <tem:I_is_onsile_hmloan_assis>${data.enable_loan_assistance}</tem:I_is_onsile_hmloan_assis>
                                          <!--Optional:-->
                                          <tem:I_is_proj_appr_needed>${data.enable_project_approval}</tem:I_is_proj_appr_needed>
                                          <!--Optional:-->
                                          <tem:I_is_spec_disb_facility>${data.enable_disbursment_facility}</tem:I_is_spec_disb_facility>
                                          <!--Optional:-->
                                          <tem:I_is_suventn_scheme>${data.enable_subvention_scheme}</tem:I_is_suventn_scheme>
                                          <!--Optional:-->
                                          <tem:I_full_time_sales>${data.remark_sales_executive}</tem:I_full_time_sales>
                                          <!--Optional:-->
                                          <tem:I_key1></tem:I_key1>
                                          <!--Optional:-->
                                          <tem:I_key2></tem:I_key2>
                                          <!--Optional:-->
                                          <tem:I_key3></tem:I_key3>
                                          <!--Optional:-->
                                          <tem:I_key4></tem:I_key4>
                                          <!--Optional:-->
                                          <tem:I_created_by>${this.builder_id}</tem:I_created_by>
                                          <!--Optional:-->
                                          <tem:Token>${this.token}</tem:Token>
                                      </tem:Insert_proj_assistance>
                                    </soapenv:Body>
                                </soapenv:Envelope>`;

        let soapaction = 'http://tempuri.org/IService1/Insert_proj_assistance';
        let result_tag = 's:Body';
        this.shared.getData(soapaction, body_reach_us_form, result_tag).subscribe(
          (data) => {
            alert('Thank you.Your Reach-Us Form is Submitted Successfully.')
            location.reload();
          }
        );
      }
      else {
        alert('Please Select Project');
      }

  }


}