import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import $ from 'jquery';
import { ActivatedRoute } from '@angular/router';





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
  branch_no:any;
  search_text:string;
  builder_id: string;
  token: string;
  select_values_of_status: any;
  status_all: string;
  message: any = '';
  selected_project: any;
  constructor(private shared: SharedService, private ar: ActivatedRoute) {
    console.log(ar)
  }

  ngOnInit(): void {
    this.shared.headerTitle('List All Projects');
    this.builder_id = '510673';
    this.token = 'MH3NPYK34J0KHDI';
    
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
        this.builder_details = data.Table[0];
        this.branch_no = this.builder_details.BRANCH_NO;
        console.log(this.builder_details);
        this.getPacProjectList();
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
        console.log(this.project_list);
      }
    );

  }
  selectStatusOption() {
    console.log(this.select_values_of_status)
    this.status_all = this.select_values_of_status = 'All';

  }

  openQueryModel(project){
    this.selected_project = project;
  }
  sendResponse() {
    if(this.message != ''){
      let body_query_detail = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                <soapenv:Header/>
                                <soapenv:Body>
                                  <tem:Insert_Query>
                                      <!--Optional:-->
                                      <tem:PROJECT_ID>${this.selected_project.PROJECT_ID}</tem:PROJECT_ID>
                                      <!--Optional:-->
                                      <tem:PHASE_ID></tem:PHASE_ID>
                                      <!--Optional:-->
                                      <tem:PROJECT_NAME>${this.selected_project.PROJECT_NAME}</tem:PROJECT_NAME>
                                      <!--Optional:-->
                                      <tem:QUERY>${this.message}</tem:QUERY>
                                      <!--Optional:-->
                                      <tem:I_QUERY_ID></tem:I_QUERY_ID>
                                      <!--Optional:-->
                                      <tem:STATUS></tem:STATUS>
                                      <!--Optional:-->
                                      <tem:I_PARENT_QUEST_ID></tem:I_PARENT_QUEST_ID>
                                      <!--Optional:-->
                                      <tem:SUBSTATUS></tem:SUBSTATUS>
                                      <!--Optional:-->
                                      <tem:K1></tem:K1>
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
          }
        }
      );
    }
    
  }

}


