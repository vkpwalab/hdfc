import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { SharedService } from '../services/shared.service';
import { ISoapMethodResponse } from 'ngx-soap';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-update-work',
  templateUrl: './update-work.component.html',
  styleUrls: ['./update-work.component.css']
})
export class UpdateWorkComponent implements OnInit {
  builder_detail: any = [];
  branch_no: any;
  project_list: any = [];
  building_list: any = [];
  project_selected: any;
  upload_doc_type: any;
  dynamic_forms: any = {};
  project_selected_detail: any;
  constructor(private shared: SharedService,private fb: FormBuilder) {
    // this.show_progress=false;
   }

  ngOnInit(): void {
    this.shared.headerTitle('Project Progress');

    this.getBuilersDetails();
  }

  getBuilersDetails(){
    let body_builders_details = { BUILDERID: '510673', Token: 'MH3NPYK34J0KHDI' };

    setTimeout(() => {
      (<any>this.shared.client).GetBuilderDetails(body_builders_details).subscribe(

        (res: ISoapMethodResponse) => {
          console.log('method response', res);
          let xmlResponse = res.xml;
          let result = res.result.GetBuilderDetailsResult;

          var result_json = JSON.parse(result)

          this.builder_detail = result_json.Table;
          console.log(this.builder_detail);
         
          this.branch_no = this.builder_detail[0].BRANCH_NO;

          this.getPacProjectList();
          this.getUploadDocType();
        },
        err => console.log(err)
      );
    }, 1000);
  }

  getPacProjectList(){
    let body_Pac_Project_List = { branch: this.branch_no, I_BUILDER_ID: '510673', Token: 'MH3NPYK34J0KHDI' };

    (<any>this.shared.client).Get__Pac_Project_List(body_Pac_Project_List).subscribe(
      (res: ISoapMethodResponse) => {
        console.log('method response', res);
        let xmlResponse = res.xml;
        let result = res.result.Get__Pac_Project_ListResult;

        var result_json = JSON.parse(result)

        this.project_list = result_json.Table;

        console.log(this.project_list);

      },
      err => console.log(err)
    );

  }

  getUploadDocType(){
    let body_upload_doc_type = { I_CD_VAL: 'DEMAND_LTR_DOC_LIST', Token: 'MH3NPYK34J0KHDI' };

    (<any>this.shared.client).Get_MASTER_DATA(body_upload_doc_type).subscribe(
      (res: ISoapMethodResponse) => {
        console.log('method response', res);
        let xmlResponse = res.xml;
        let result = res.result.Get_MASTER_DATAResult;

        var result_json = JSON.parse(result)

        this.upload_doc_type = result_json.Table;

        console.log(this.upload_doc_type);
      },
      err => console.log(err)
    );
  }

  
  projectChange(event){
    this.project_selected = event.value;
    this.project_selected_detail = this.project_list.filter(p=> p.PROJECTID == this.project_selected );
    
    let body_Building_List = { i_project_no: this.project_selected, Token: 'MH3NPYK34J0KHDI' };

    (<any>this.shared.client).get_project_building(body_Building_List).subscribe(
      (res: ISoapMethodResponse) => {
        console.log('method response', res);
        let xmlResponse = res.xml;
        let result = res.result.get_project_buildingResult;

        var result_json = JSON.parse(result)

        
        result_json.Table.forEach(element => {
          this.dynamic_forms[element.PROJ_BLDG_NO] = this.fb.group({
            'update_current_progress': [element.STAGE_OF_CONS, Validators.required],
            'percent_payment_due': [element.PERC_DUE, Validators.required],
            'progress_date': [element.PROGRESS, Validators.required],
            'doc_type': [element.DOCUMENT_TYPE, Validators.required],
            'build_no':[element.PROJ_BLDG_NO],
            'build_name':[element.BLDG_NAME],
          });

        });

        this.building_list = result_json.Table;
        console.log(this.building_list);

      },
      err => console.log(err)
    );
  }

  updateBuildingData(data){
    console.log(data);
    if(this.dynamic_forms[data.build_no].valid){
      let body_insert_query = { 
        I_PROJECT_NO: this.project_selected,
        I_BUILDING_NAME:data.build_name,
        I_BUILDING_NO: data.build_no,
        I_PROG_DATE: data.progress_date,
        I_PROG_REMARKS: data.update_current_progress,
        I_AMOUNT_DUE: data.percent_payment_due,
        I_UPLOAD_DOC: data.doc_type,
        I_IS_DEMAND_LETTER: '',
        I_CREATED_BY: '510673', 
        Token: 'MH3NPYK34J0KHDI' };
        
        console.log(body_insert_query);
      (<any>this.shared.client).Save_Bldng_Progress(body_insert_query).subscribe(
        (res: ISoapMethodResponse) => {
          console.log('method response', res);
          let xmlResponse = res.xml;
          let result = res.result.Save_Bldng_ProgressResult;
  
          var result_json = JSON.parse(result)
          console.log(result_json)
        },
        err => console.log(err)
      );
    }
  }
}
