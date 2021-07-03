import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';





@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {
  maxChars = 4000;
  role = '';
  chars = 0;
  builder_details: any = [];
  project_list: any = [];
  branch_no: any;
  search_text: string;
  builder_id: string;
  token: string;
  select_values_of_status: any;
  status_all: string;
  message: any = '';
  selected_project: any;
  file: any;
  file_name: any = '';
  file_uploaded: boolean;
  file_ext: any;
  query_id: any;
  loading: boolean;
  project_list_len: any = 0;
  constructor(private shared: SharedService, private ar: ActivatedRoute,public router:Router) {
    console.log(ar)
  }

  ngOnInit(): void {
    this.shared.headerTitle('List All Projects');
    this.builder_id = localStorage.getItem("builder_id");
    this.token = localStorage.getItem("auth-token")

    this.loading = true;
    this.selectStatusOption();
    this.getBuilersDetails();

  }

  showFilter(id) {
    if ($('#filter' + id).is(':visible')) {
      $('#filter' + id).hide();
    } else {
      $('#filter' + id).show();
    }
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
        if(data.o_msg == "You are not authorized.Kindly try again"){
          this.router.navigate(['login']);
        }else{
          this.builder_details = data.Table[0];
        this.branch_no = this.builder_details.BRANCH_NO;
        console.log(this.builder_details);
        this.getPacProjectList();

        }
        
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
        this.project_list_len = this.project_list.length;
        this.project_list.forEach((element,key) => {
          let doc_perc = (element.PENDING_DOC / element.UPL_DOC_CNT) * 100;
          this.project_list[0].doc_perc = doc_perc;
          console.log(key)
          if(element.PROJECT_STAUS==" "){
            console.log(key)
            this.project_list[key].PROJECT_STAUS = "Pending"
          }else if(element.PROJECT_STAUS = "APPROVED"){
            this.project_list[key].PROJECT_STAUS = "Completed"
          }
        });
        this.loading = false;
        console.log(this.project_list);
      }
    );

  }
  selectStatusOption() {
    console.log(this.select_values_of_status)
    this.status_all = this.select_values_of_status = 'All';

  }

  openQueryModel(project) {
    this.selected_project = project;
    this.message = '';
    this.file = '';
    this.file_name = '';
    this.file_uploaded = false;
    this.file_ext = '';

  }

  sendResponse() {
    if (this.message != '') {
      if (this.file_uploaded) {
        this.shared.uploadDoc(this.file, this.file_ext, this.selected_project.PROJECTID, 'RTQUERIES', this.file_name).subscribe(
          (res) => {
            if (res == 'OK') {
              this.shared.updateDocDetail(this.selected_project.PROJECTID, this.file_name, this.file_ext, 'RTQUERIES', '').subscribe(
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

  getQueryId(srno){
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
    console.log(this.selected_project);
    let body_query_detail = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                              <soapenv:Header/>
                              <soapenv:Body>
                                <tem:Insert_Query>
                                    <!--Optional:-->
                                    <tem:PROJECT_ID>${this.selected_project.PROJECTID}</tem:PROJECT_ID>
                                    <!--Optional:-->
                                    <tem:PHASE_ID></tem:PHASE_ID>
                                    <!--Optional:-->
                                    <tem:PROJECT_NAME>${this.selected_project.PROJECT_NAME}</tem:PROJECT_NAME>
                                    <!--Optional:-->
                                    <tem:QUERY>${this.message}</tem:QUERY>
                                    <!--Optional:-->
                                    <tem:I_QUERY_ID></tem:I_QUERY_ID>
                                    <!--Optional:-->
                                    <tem:STATUS>PENDING</tem:STATUS>
                                    <!--Optional:-->
                                    <tem:I_PARENT_QUEST_ID></tem:I_PARENT_QUEST_ID>
                                    <!--Optional:-->
                                    <tem:SUBSTATUS></tem:SUBSTATUS>
                                    <!--Optional:-->
                                    <tem:K1>${srno}</tem:K1>
                                    <!--Optional:-->
                                    <tem:K2></tem:K2>
                                    <!--Optional:-->
                                    <tem:K3></tem:K3>
                                    <!--Optional:-->
                                    <tem:K4></tem:K4>
                                    <!--Optional:-->
                                    <tem:CREATED_BY>${this.builder_id}</tem:CREATED_BY>
                                    <!--Optional:-->
                                    <tem:UPDATED_BY>${this.builder_id}</tem:UPDATED_BY>
                                    <!--Optional:-->
                                    <tem:Question>${this.message}</tem:Question>
                                    <!--Optional:-->
                                    <tem:I_QUERY_TYPE>Builder</tem:I_QUERY_TYPE>
                                    <!--Optional:-->
                                    <tem:I_URL></tem:I_URL>
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
          this.message = '';
          this.file = '';
          this.file_name = '';
          this.file_ext = '';
          this.file_uploaded = false;
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


    }
  }
}


