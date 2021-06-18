import { Component, OnInit, ViewChild } from '@angular/core';

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
  constructor(private shared: SharedService, private fb: FormBuilder, public modalService:NgbModal) {
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
    console.log(status)
    const rera_app_date = this.rera_detail_form.get('rera_app_date')
    const valid_from_date = this.rera_detail_form.get('valid_from_date')
    const valid_to_date = this.rera_detail_form.get('valid_to_date')
    const rera_regi_number = this.rera_detail_form.get('rera_regi_number')
    if(status == "Registered"){

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
    }else if(status == "Applied"){

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
      
    }else{
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
    console.log(data);

    const messageArr = [];
    messageArr.push("<ul>")
    Object.keys(this.rera_detail_form.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.rera_detail_form.get(key).errors;
      if (controlErrors != null) {
      
        Object.keys(controlErrors).forEach((keyError) => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          messageArr.push("<li>" + key.replace(/_/g, ' ') + " is " + keyError + "</li>");

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
            this.shared.sharedTab3.tab = false;

            $('#pills-tabContent > .active').next().addClass('active').prev().removeClass('active')
            $('#pills-tab > li > .active').parent('li').next().children('a').addClass('active').parent().prev().children().removeClass('active');
          }
          console.log(data);
        }
      );

    }

  }

  openModal(name) {
    const str = name.join().replace(/,/g,'');
    const modalRef = this.modalService.open(ModalComponentComponent,{size:'sm'});
    modalRef.componentInstance.name = str;

  }
}
