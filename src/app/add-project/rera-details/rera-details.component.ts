import { Component, OnInit } from '@angular/core';

import { SharedService } from 'src/app/services/shared.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import $ from 'jquery';

@Component({
  selector: 'app-rera-details',
  templateUrl: './rera-details.component.html',
  styleUrls: ['./rera-details.component.css']
})
export class RERADetailsComponent implements OnInit {
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
  constructor(private shared: SharedService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.builder_id = '510673';
    this.token = 'MH3NPYK34J0KHDI';
    this.rera_detail_form = this.fb.group({
      'rera_regi_status': [''],
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
      }
    )

    setTimeout(() => {
      this.getReraStatus();
    }, 2000);
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

  reraStatusChange(event){
    let status = event.value;
    if(status == "Registered"){
      this.from_date = false;
      this.to_date = false;
      this.reg_num = false;
      this.app_date = true;
      this.rera_detail_form.controls['valid_from_date'].setValidators([Validators.required]);
      this.rera_detail_form.controls['valid_to_date'].setValidators([Validators.required]);
    }else if(status == "Applied"){
      this.from_date = true;
      this.to_date = true;
      this.reg_num = true;
      this.app_date = false;
      this.rera_detail_form.controls['valid_from_date'].reset();
      this.rera_detail_form.controls['valid_to_date'].reset();
      this.rera_detail_form.controls['valid_from_date'].clearValidators();
      this.rera_detail_form.controls['valid_to_date'].clearValidators();
    }else{
      this.from_date = true;
      this.to_date = true;
      this.reg_num = true;
      this.app_date = true;
      this.rera_detail_form.controls['valid_from_date'].reset();
      this.rera_detail_form.controls['valid_to_date'].reset();
      this.rera_detail_form.controls['valid_from_date'].clearValidators();
      this.rera_detail_form.controls['valid_to_date'].clearValidators();
    }

    this.rera_detail_form.controls['valid_from_date'].updateValueAndValidity({onlySelf: true});
    this.rera_detail_form.controls['valid_to_date'].updateValueAndValidity({onlySelf: true});
  }

  submitReraDetail(data) {
    console.log(data);
    if (this.rera_detail_form.valid) {
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
                                      <tem:I_RERA_APPLN_DATE>${ data.rera_app_date}</tem:I_RERA_APPLN_DATE>
                                      <!--Optional:-->
                                      <tem:I_RERA_REMARK>${ data.remark}</tem:I_RERA_REMARK>
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
            $('#pills-tabContent > .active').next().addClass('active').prev().removeClass('active')
            $('#pills-tab > li > .active').parent('li').next().children('a').addClass('active').parent().prev().children().removeClass('active');
          }
          console.log(data);
        }
      );

    }

  }
}
