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
  builder_id: string;
  token: string;
  constructor(private shared: SharedService,private fb: FormBuilder) {
    // this.show_progress=false;
   }

  ngOnInit(): void {
    this.shared.headerTitle('Project Progress');
    this.builder_id = '510673';
    this.token = 'MH3NPYK34J0KHDI';
    this.getBuilersDetails();
  }

  getBuilersDetails(){
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
        this.builder_detail = data.Table[0];
        this.branch_no = this.builder_detail.BRANCH_NO;
        console.log(this.builder_detail);
        this.getPacProjectList();
        this.getUploadDocType();
      }
    );
  }

  getPacProjectList(){
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

  getUploadDocType(){
    let body_upload_doc_type = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                  <soapenv:Header/>
                                  <soapenv:Body>
                                    <tem:Get_MASTER_DATA>
                                        <!--Optional:-->
                                        <tem:I_CD_VAL>DEMAND_LTR_DOC_LIST</tem:I_CD_VAL>
                                        <!--Optional:-->
                                        <tem:Token>${this.token}</tem:Token>
                                    </tem:Get_MASTER_DATA>
                                  </soapenv:Body>
                              </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/Get_MASTER_DATA';
    let result_tag = 'Get_MASTER_DATAResult';
    this.shared.getData(soapaction, body_upload_doc_type, result_tag).subscribe(
      (data) => {
        this.upload_doc_type = data.Table;
        console.log(this.upload_doc_type);
      }
    );
  }

  
  projectChange(event){
    this.project_selected = event.value;
    this.project_selected_detail = this.project_list.filter(p=> p.PROJECTID == this.project_selected );
    
    let body_Building_List = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                <soapenv:Header/>
                                <soapenv:Body>
                                  <tem:get_project_building>
                                      <!--Optional:-->
                                      <tem:i_project_no>${this.project_selected}</tem:i_project_no>
                                      <!--Optional:-->
                                      <tem:Token>${this.token}</tem:Token>
                                  </tem:get_project_building>
                                </soapenv:Body>
                            </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/get_project_building';
    let result_tag = 'get_project_buildingResult';
    this.shared.getData(soapaction, body_Building_List, result_tag).subscribe(
      (data) => {
        data.Table.forEach(element => {
          this.dynamic_forms[element.PROJ_BLDG_NO] = this.fb.group({
            'update_current_progress': [element.STAGE_OF_CONS, Validators.required],
            'percent_payment_due': [element.PERC_DUE, Validators.required],
            'progress_date': [element.PROGRESS, Validators.required],
            'doc_type': [element.DOCUMENT_TYPE, Validators.required],
            'build_no':[element.PROJ_BLDG_NO],
            'build_name':[element.BLDG_NAME],
          });

        });
        this.building_list = data.Table;
        console.log(this.building_list);
      }
    );
    
  }

  updateBuildingData(data){
    console.log(data);
    if(this.dynamic_forms[data.build_no].valid){
      let body_insert_query = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
      <soapenv:Header/>
      <soapenv:Body>
         <tem:Save_Bldng_Progress>
            <!--Optional:-->
            <tem:I_PROJECT_NO>${this.project_selected}</tem:I_PROJECT_NO>
            <!--Optional:-->
            <tem:I_BUILDING_NAME>${data.build_name}</tem:I_BUILDING_NAME>
            <!--Optional:-->
            <tem:I_BUILDING_NO>${data.build_no}</tem:I_BUILDING_NO>
            <!--Optional:-->
            <tem:I_PROG_DATE>${data.progress_date}</tem:I_PROG_DATE>
            <!--Optional:-->
            <tem:I_PROG_REMARKS>${data.update_current_progress}</tem:I_PROG_REMARKS>
            <!--Optional:-->
            <tem:I_AMOUNT_DUE>${data.percent_payment_due}</tem:I_AMOUNT_DUE>
            <!--Optional:-->
            <tem:I_UPLOAD_DOC>${data.doc_type}</tem:I_UPLOAD_DOC>
            <!--Optional:-->
            <tem:I_IS_DEMAND_LETTER></tem:I_IS_DEMAND_LETTER>
            <!--Optional:-->
            <tem:I_CREATED_BY>${this.builder_id}</tem:I_CREATED_BY>
            <!--Optional:-->
            <tem:Token>${this.token}</tem:Token>
         </tem:Save_Bldng_Progress>
      </soapenv:Body>
   </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/Save_Bldng_Progress';
    let result_tag = 'Save_Bldng_ProgressResult';
    this.shared.getData(soapaction, body_insert_query, result_tag).subscribe(
      (data) => {
          console.log(data)
      }
    );
    }
  }
}
