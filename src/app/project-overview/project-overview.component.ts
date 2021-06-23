import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import $ from 'jquery';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.css']
})
export class ProjectOverviewComponent implements OnInit {

  construction_stage1 = new FormControl('', Validators.required);
  construction_stage2 = new FormControl('', Validators.required);
  construction_stage3 = new FormControl('', Validators.required);
  slab_complete1 = new FormControl('', Validators.required);
  slab_complete2 = new FormControl('', Validators.required);
  slab_complete3 = new FormControl('', Validators.required);
  remark1 = new FormControl('', Validators.required);
  remark2 = new FormControl('', Validators.required);
  remark3 = new FormControl('', Validators.required);
  calendar1 = new FormControl('', Validators.required);
  calendar2 = new FormControl('', Validators.required);
  calendar3 = new FormControl('', Validators.required);
  project_id: any;
  builder_id: string;
  token: string;
  project_detail: any;
  building_list: any;
  query: any = [];
  query_data: any = [];
  message: any = '';
  disb_percent: number;
  leads_no: any = 0;
  file: any;
  file_name: any;
  file_uploaded: boolean;
  file_ext: any;
  file_size: string;
  query_id: any;
  doc_ext_image: any;
  file_icon: any;

  @Input()
  selectedIndex: number | null

  constructor(private shared: SharedService, private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    console.log("seles"+this.selectedIndex)
    this.shared.headerTitle('Project Overview');
    this.builder_id = localStorage.getItem("builder_id");
    this.token = localStorage.getItem("auth-token")
    this.doc_ext_image = {
      pdf: './assets/images/pdf.png',
      xls: './assets/images/excel_icon.png',
      xlsx: './assets/images/excel_icon.png',
      csv: './assets/images/excel_icon.png',
      doc: './assets/images/word_icon.png',
      docx: './assets/images/word_icon.png',
      other: './assets/images/word_icon.png',
      png: './assets/images/png_icon.png',
      jpeg: './assets/images/png_icon.png',
      jpg: './assets/images/png_icon.png',
    }
    this.activatedRoute.params.subscribe(params => {
      if (params['pid']) {
        this.project_id = params['pid'];
      } else {
        this.route.navigate(['dashboard']);
      }
    });

    this.getProjectLead();
    this.getProjectDetail();
  }

  getProjectDetail() {
    let body_raise_demand_letter = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                      <soapenv:Header/>
                                      <soapenv:Body>
                                        <tem:GET_PROJECT_OVERVIEW>
                                            <!--Optional:-->
                                            <tem:I_PROJECT_NO>${this.project_id}</tem:I_PROJECT_NO>
                                            <!--Optional:-->
                                            <tem:Token>${this.token}</tem:Token>
                                        </tem:GET_PROJECT_OVERVIEW>
                                      </soapenv:Body>
                                  </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/GET_PROJECT_OVERVIEW';
    let result_tag = 'GET_PROJECT_OVERVIEWResult';
    this.shared.getData(soapaction, body_raise_demand_letter, result_tag).subscribe(
      (data) => {
        this.project_detail = data.Table[0];
        this.disb_percent = Math.round((this.project_detail.TOT_DISB / this.project_detail.TOT_SANC) * 100);

        $('#disb-progress').css('width', this.disb_percent + '%');
        console.log(this.project_detail);
        // this.getBuildingProgress();
      }
    );
  }

  getBuildingProgress() {
    let body_Building_List = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                <soapenv:Header/>
                                <soapenv:Body>
                                  <tem:get_project_building>
                                      <!--Optional:-->
                                      <tem:i_project_no>${this.project_id}</tem:i_project_no>
                                      <!--Optional:-->
                                      <tem:Token>${this.token}</tem:Token>
                                  </tem:get_project_building>
                                </soapenv:Body>
                            </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/get_project_building';
    let result_tag = 'get_project_buildingResult';
    this.shared.getData(soapaction, body_Building_List, result_tag).subscribe(
      (data) => {
        this.building_list = data.Table;
        console.log(this.building_list);
      }
    );
  }

  queryData(query) {
    this.query = query;

    let body_query_detail = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                              <soapenv:Header/>
                              <soapenv:Body>
                                <tem:Get_QRY_DTA_BY_QUESTID>
                                    <!--Optional:-->
                                    <tem:I_QUEST_ID>${this.query.QUEST_ID}</tem:I_QUEST_ID>
                                    <!--Optional:-->
                                    <tem:Token>${this.token}</tem:Token>
                                </tem:Get_QRY_DTA_BY_QUESTID>
                              </soapenv:Body>
                          </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/Get_QRY_DTA_BY_QUESTID';
    let result_tag = 'Get_QRY_DTA_BY_QUESTIDResult';
    this.shared.getData(soapaction, body_query_detail, result_tag).subscribe(
      (data) => {
        this.query_data = data.Table;

        console.log(this.query_data)
      }
    );
  }

  getProjectLead() {
    let body_Building_List = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                <soapenv:Header/>
                                <soapenv:Body>
                                  <tem:GET_PROJ_LEAD_CLIENT>
                                      <!--Optional:-->
                                      <tem:i_project_id>${this.project_id}</tem:i_project_id>
                                      <!--Optional:-->
                                      <tem:I_TYPE>?</tem:I_TYPE>
                                      <!--Optional:-->
                                      <tem:Token>${this.token}</tem:Token>
                                  </tem:GET_PROJ_LEAD_CLIENT>
                                </soapenv:Body>
                            </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/GET_PROJ_LEAD_CLIENT';
    let result_tag = 'GET_PROJ_LEAD_CLIENTResult';
    this.shared.getData(soapaction, body_Building_List, result_tag).subscribe(
      (data) => {
        console.log('lead', data.Table)
        this.leads_no = data.Table.length;
      }
    );
  }

  sendResponse() {
    if (this.message != '') {
      if (this.file_uploaded) {
        this.shared.uploadDoc(this.file, this.file_ext, this.query.PROJECT_ID, 'RTQUERIES', this.file_name).subscribe(
          (res) => {
            if (res == 'OK') {
              this.shared.updateDocDetail(this.query.PROJECT_ID, this.file_name, this.file_ext, 'RTQUERIES', '').subscribe(
                (doc_data) => {
                  this.getQueryId(doc_data.o_srno);
                  console.log(doc_data)
                }
              )
            }
          }
        )
      } else {
        this.getQueryId('');
      }
    }
  }

  getQueryId(srno) {
    let body_query_detail = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                              <soapenv:Header/>
                              <soapenv:Body>
                                <tem:Get_Query_id>
                                    <!--Optional:-->
                                    <tem:Token>${this.token}</tem:Token>
                                </tem:Get_Query_id>
                              </soapenv:Body>
                          </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/Get_Query_id';
    let result_tag = 'Get_Query_idResult';
    this.shared.getData(soapaction, body_query_detail, result_tag).subscribe(
      (data) => {
        this.query_id = data.Table[0].QUERY_ID;
        this.updateQuery(srno);
      }
    );
  }

  updateQuery(srno) {
    let body_query_detail = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                              <soapenv:Header/>
                              <soapenv:Body>
                                <tem:Insert_Query>
                                    <!--Optional:-->
                                    <tem:PROJECT_ID>${this.query.PROJECT_ID}</tem:PROJECT_ID>
                                    <!--Optional:-->
                                    <tem:PHASE_ID>${this.query.PHASE_ID}</tem:PHASE_ID>
                                    <!--Optional:-->
                                    <tem:PROJECT_NAME>${this.query.PROJECT_NAME}</tem:PROJECT_NAME>
                                    <!--Optional:-->
                                    <tem:QUERY>${this.message}</tem:QUERY>
                                    <!--Optional:-->
                                    <tem:I_QUERY_ID></tem:I_QUERY_ID>
                                    <!--Optional:-->
                                    <tem:STATUS>${this.query.STATUS}</tem:STATUS>
                                    <!--Optional:-->
                                    <tem:I_PARENT_QUEST_ID>${this.query_id}</tem:I_PARENT_QUEST_ID>
                                    <!--Optional:-->
                                    <tem:SUBSTATUS>${this.query.SUBSTATUS}</tem:SUBSTATUS>
                                    <!--Optional:-->
                                    <tem:K1>${srno}</tem:K1>
                                    <!--Optional:-->
                                    <tem:K2>${this.query.K2}</tem:K2>
                                    <!--Optional:-->
                                    <tem:K3>${this.query.K3}</tem:K3>
                                    <!--Optional:-->
                                    <tem:K4>${this.query.K4}</tem:K4>
                                    <!--Optional:-->
                                    <tem:CREATED_BY>${this.builder_id}</tem:CREATED_BY>
                                    <!--Optional:-->
                                    <tem:UPDATED_BY>${this.builder_id}</tem:UPDATED_BY>
                                    <!--Optional:-->
                                    <tem:Question>${this.message}</tem:Question>
                                    <!--Optional:-->
                                    <tem:I_QUERY_TYPE>Builder</tem:I_QUERY_TYPE>
                                    <!--Optional:-->
                                    <tem:I_URL>${this.query.URL}</tem:I_URL>
                                    <!--Optional:-->
                                    <tem:Token>${this.token}</tem:Token>
                                </tem:Insert_Query>
                              </soapenv:Body>
                          </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/Insert_Query';
    let result_tag = 'Insert_QueryResult';
    this.shared.getData(soapaction, body_query_detail, result_tag).subscribe(
      (data) => {
        if (data == "Success") {
          alert('Your query is submitted');
        }
      }
    );
  }

  uploadFileEvent($event) {
    if ($event.target.files[0]) {
      var file: File = $event.target.files[0];
      // if (!this.validateFile(file)) {
      //   alert("Unsupported image format");
      //   return false;
      // }

      if (file.size > 4294967296) {
        alert("Max. File size: 4GB");
        return false;
      }
      this.file = $event.target.files[0];
      console.log(this.file)
      this.file_name = this.file.name.split('.')[0]
      this.file_uploaded = true;
      this.file_ext = this.file.name.split('.').pop();
      this.file_size = (this.file.size / (1024 * 1024)).toFixed(2);
      let ext = this.file_ext.toLowerCase();
      this.file_icon = this.doc_ext_image[ext]

    }
  }
  removeFile() {
    this.file = '';
    this.file_name = '';
    this.file_uploaded = false;
    this.file_ext = '';
    this.file_size = '';
  }
}
