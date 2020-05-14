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
  ans: void;



  constructor(private shared: SharedService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.getBuilersDetails();
    this.selectProjectOption();
    this.shared.headerTitle('Reach Us');
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
      'enable_project_site': ['']


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

    }, 1000);
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









  selectProjectOption() {
    console.log(this.select_values_of_project)
  }


  submitReachUsForm(data) {

    let body_reach_us_form = {
      I_proj_appr_needed: data.remark_approval,
      I_camp_managment: data.remark_campaign,
      I_suventn_scheme: data.remark_subvention_scheme,
      I_spec_disb_facility: data.remark_disbursment_facility,
      I_onsile_hmloan_assis: data.remark_home_loan,
      I_full_time_sales: data.remark_sales_executive,
      Token: 'MH3NPYK34J0KHDI',
      Project_Name: data.select_values_of_project,
      status_approval: data.enable_project_approval,
      status_management: data.enable_campaign_management,
      status_subvention: data.enable_subvention_scheme,
      status_disbursment: data.enable_disbursment_facility,
      status_loan: data.enable_loan_assistance,
      status_project: data.enable_project_site
    }
    console.log(body_reach_us_form)
    console.log(data);
    setTimeout(() => {
      if (this.reachus.valid) {

        (<any>this.shared.client).Insert_proj_assistance(body_reach_us_form).subscribe(
          (res: ISoapMethodResponse) => {
            console.log('method response', res);
            let xmlResponse = res.xml;
            alert('Thank you.Your Reach-Us Form is Submitted Successfully.')
            location.reload();


          },
          (err) => console.log(err)
        );
      }
      else {
        alert('Please Select Project')
      }
    }, 4000);

  }


}