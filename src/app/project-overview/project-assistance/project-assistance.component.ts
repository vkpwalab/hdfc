import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-project-assistance',
  templateUrl: './project-assistance.component.html',
  styleUrls: ['./project-assistance.component.css']
})
export class ProjectAssistanceComponent implements OnInit {
  reachus: any;
  builder_id: string;
  token: string;
  @Input() project_id: any;
  constructor(private fb: FormBuilder, private shared:SharedService) { }

  ngOnInit(): void {
    this.builder_id = localStorage.getItem("builder_id");
    this.token = localStorage.getItem("auth-token")
    
    this.reachus = this.fb.group({
      'remark_approval': [''],
      'remark_campaign': [''],
      'remark_subvention_scheme': [''],
      'remark_disbursment_facility': [''],
      'remark_home_loan': [''],
      'remark_sales_executive': [''],
      'enable_project_approval': [''],
      'enable_campaign_management': [''],
      'enable_subvention_scheme': [''],
      'enable_disbursment_facility': [''],
      'enable_loan_assistance': [''],
      'enable_sale_excutive': ['']
    })
  }

  submitReachUsForm(data) {

    if (this.reachus.valid) {

      let body_reach_us_form = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                  <soapenv:Header/>
                                  <soapenv:Body>
                                    <tem:Insert_proj_assistance>
                                        <!--Optional:-->
                                        <tem:I_project_id>${this.project_id}</tem:I_project_id>
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
          alert('Thank you.Form is Submitted Successfully.')
          location.reload();
        }
      );
    }
    else {
      alert('Please Select Project');
    }

}

}
