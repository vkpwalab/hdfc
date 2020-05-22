import { Component, OnInit } from '@angular/core';
import { ISoapMethodResponse } from 'ngx-soap';
import { SharedService } from 'src/app/services/shared.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
  constructor(private shared:SharedService, private fb: FormBuilder) { }

  ngOnInit(): void {
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

  getReraStatus(){
    let body_rera_status = { I_CD_VAL: 'RERA_STATUS', Token: 'MH3NPYK34J0KHDI' };

    (<any>this.shared.client).Get_MASTER_DATA(body_rera_status).subscribe(
      (res: ISoapMethodResponse) => {
        console.log('method response', res);
        let xmlResponse = res.xml;
        let result = res.result.Get_MASTER_DATAResult;

        var result_json = JSON.parse(result)

        this.rera_status_list = result_json.Table;

        console.log(this.rera_status_list);
      },
      err => console.log(err)
    );
  }

  submitReraDetail(data) {
    console.log(data);
    if(this.rera_detail_form.valid){
      // localStorage.setItem('rera_detail',JSON.stringify(data));
      let body_rera_submit = { 
        I_PROJECT_NO: this.project_id, 
        I_RERA_APPL_STAT: data.rera_regi_status,
        I_RERA_APPLN_NO: data.rera_regi_number,
        I_RERA_APPLN_DATE: data.rera_app_date,
        I_RERA_REMARK: data.remark,
        I_PROJ_CERT_SRNO: '',
        I_RERA_APPRVL_DATE: data.project_launch_date,
        I_VALID_FROM_DATE: data.valid_from_date,
        I_VALID_TO_DATE: data.valid_to_date,
        i_created_by: '510673',
        Token: 'MH3NPYK34J0KHDI' 
      };

      (<any>this.shared.client).Insert_Rera_details(body_rera_submit).subscribe(
        (res: ISoapMethodResponse) => {
          console.log('method response', res);
          let xmlResponse = res.xml;
          let result = res.result.Insert_Rera_detailsResult;
  
          var result_json = JSON.parse(result)
  
          // this.rera_status_list = result_json.Table;
          if(result_json == 'Success'){
            $('#pills-tabContent > .active').next().addClass('active').prev().removeClass('active')
            $('#pills-tab > li > .active').parent('li').next().children('a').addClass('active').parent().prev().children().removeClass('active');
          }
          console.log(result_json);
        },
        err => console.log(err)
      );
    }

  }
}
