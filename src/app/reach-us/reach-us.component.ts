import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ISoapMethodResponse } from 'ngx-soap';
import $ from 'jquery';
@Component({
  selector: 'app-reach-us',
  templateUrl: './reach-us.component.html',
  styleUrls: ['./reach-us.component.css']
})
export class ReachUsComponent implements OnInit {

  slide_toggle_form: FormGroup;
  reachus: FormGroup;
  project_list: any;
  select_values_of_project: any;
  project_site: string;
  project_approval: string;
  campaign_management: string;
  subvention: string;
  disbursment_facility: string;
  loan_assistance: string;
  builders_details: any;
  branch_no: any;
  reachus_project: FormGroup;



  constructor(private shared: SharedService, private fb: FormBuilder) {
    this.slide_toggle_form = this.fb.group({
      enable_project_approval: false,
      enable_campaign_management: false,
      enable_subvention_scheme: false,
      enable_disbursment_facility: false,
      enable_loan_assistance: false,
      enable_project_site: false,

      project_approval: [
        {
          value: null,
          disabled: true,
        },
      ],
      campaign_management: [
        {
          value: null,
          disabled: true,
        },
      ],
      subvention: [
        {
          value: null,
          disabled: true,
        },
      ],
      disbursment_facility: [
        {
          value: null,
          disabled: true,
        },
      ],
      loan_assistance: [
        {
          value: null,
          disabled: true,
        },
      ],
      project_site: [
        {
          value: null,
          disabled: true,
        },
      ],
    });
    this.updateText();
  }

  ngOnInit(): void {

    this.getBuilersDetails();
    this.selectProjectOption();
    this.shared.headerTitle('Reach Us');
    this.reachus = this.fb.group({
      'approval': [''],
      'campaign': [''],
      'subvention_scheme': [''],
      'disbursment_facility': [''],
      'home_loan': [''],
      'sales_executive': ['']
     
    })
    this.reachus_project = this.fb.group({
      
      'select_project': ['', Validators.required]
    })
  




  }

  getBuilersDetails() {
    let body_builders_details = { BUILDERID: '510673', Token: 'MH3NPYK34J0KHDI' };

    setTimeout(() => {

      (<any>this.shared.client).GetBuilderDetails(body_builders_details).subscribe(

        (res: ISoapMethodResponse) => {
          console.log('method response', res);
          let xmlResponse = res.xml;
          let result = res.result.GetBuilderDetailsResult;
          // console.log(result);

          var result_json = JSON.parse(result)
          // console.log("object", result_json)


          this.builders_details = result_json.Table;
          this.branch_no = this.builders_details[0].BRANCH_NO;

          this.getPacProjectList();
        },
        err => console.log(err)
      );

    }, 100);
  }

  getPacProjectList() {
    let body_Pac_Project_List = { branch: this.branch_no, I_BUILDER_ID: '510673', Token: 'MH3NPYK34J0KHDI' };

  
      (<any>this.shared.client).Get__Pac_Project_List(body_Pac_Project_List).subscribe(
        (res: ISoapMethodResponse) => {
          console.log('method response', res);
          let xmlResponse = res.xml;
          let result = res.result.Get__Pac_Project_ListResult;
          console.log(result);

          var result_json = JSON.parse(result)
          console.log("object", result_json)

          this.project_list = result_json.Table;
        },
        err => console.log(err)
      );
    

  }
  updateText() {
    this.project_approval = this.slide_toggle_form.value.enable_project_approval ? "Yes" : "No";
    this.campaign_management = this.slide_toggle_form.value.enable_campaign_management ? "Yes" : "No";
    this.subvention = this.slide_toggle_form.value.enable_subvention_scheme ? "Yes" : "No";
    this.disbursment_facility = this.slide_toggle_form.value.enable_disbursment_facility ? "Yes" : "No";
    this.loan_assistance = this.slide_toggle_form.value.enable_loan_assistance ? "Yes" : "No";
    this.project_site = this.slide_toggle_form.value.enable_project_site ? "Yes" : "No";


  }
  changeToggleApproval(enable_project_approval: boolean) {
    const field1 = this.slide_toggle_form.get('project_approval');
    if (enable_project_approval) {
      field1.enable();
    } else {
      field1.disable();
    }
    this.updateText();
  }

  changeSubventionScheme(enable_subvention_scheme: boolean) {

    const field2 = this.slide_toggle_form.get('subvention');

    if (enable_subvention_scheme) {
      field2.enable();
    } else {
      field2.disable();
    }
    this.updateText();
  }
  changeCampaign(enable_campaign_management: boolean) {

    const field3 = this.slide_toggle_form.get('campaign_management');

    if (enable_campaign_management) {
      field3.enable();
    } else {
      field3.disable();
    }
    this.updateText();
  }
  changeDisburmentFacility(enable_disbursment_facility: boolean) {

    const field4 = this.slide_toggle_form.get('disbursment_facility');

    if (enable_disbursment_facility) {
      field4.enable();
    } else {
      field4.disable();
    }
    this.updateText();
  }
  changeLoanAssistance(enable_loan_assistance: boolean) {

    const field5 = this.slide_toggle_form.get('loan_assistance');

    if (enable_loan_assistance) {
      field5.enable();
    } else {
      field5.disable();
    }
    this.updateText();
  }
  changeProjectSite(enable_project_site: boolean) {

    const field6 = this.slide_toggle_form.get('project_site');

    if (enable_project_site) {
      field6.enable();
    } else {
      field6.disable();
    }
    this.updateText();
  }




  selectProjectOption() {
    console.log(this.select_values_of_project)
  }
  

  submitReachUsForm(data) {
   
    let body_reach_us_form = { I_proj_appr_needed: data.approval, I_camp_managment: data.campaign, I_suventn_scheme: data.subvention_scheme, I_spec_disb_facility: data.disbursment_facility, I_onsile_hmloan_assis: data.home_loan, I_full_time_sales: data.sales_executive, Token: 'MH3NPYK34J0KHDI', Project_Name: this.select_values_of_project, Approval_status: this.project_approval, status_approval: this.project_approval, status_management: this.campaign_management, status_subvention: this.subvention, status_disbursment: this.disbursment_facility, status_loan: this.loan_assistance, status_project: this.project_site }
    console.log(body_reach_us_form)
    console.log(data);
    setTimeout(() => {
      if (this.reachus_project.valid) {

      (<any>this.shared.client).Insert_proj_assistance(body_reach_us_form).subscribe(
        (res: ISoapMethodResponse) => {
          console.log('method response', res);
          let xmlResponse = res.xml;
          alert('Thank you.Your Reach-Us Form is Submitted Successfully.')
          // location.reload();


        },
        (err) => console.log(err)
      );
      }
      else{
        alert('Please Select Project')
      }
    }, 4000);

  }


}