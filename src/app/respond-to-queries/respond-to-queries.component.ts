import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-respond-to-queries',
  templateUrl: './respond-to-queries.component.html',
  styleUrls: ['./respond-to-queries.component.css']
})
export class RespondToQueriesComponent implements OnInit {
  branch_no: any;
  project_list: any;
  query_list: any;
  project_selected: any;
  builder_detail: any;
  builder_names: any = {};
  query_data: any = [];
  raised_by: any = "";
  message: any = '';
  selected_query: any;
  builder_id: string;
  token: string;

  constructor(private shared: SharedService) { }

  ngOnInit(): void {
    this.shared.headerTitle('Respond To Queries');
    this.builder_id = '510673';
    this.token = 'MH3NPYK34J0KHDI';
    this.getBuilersDetails();
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
        this.builder_detail = data.Table[0];
        this.branch_no = this.builder_detail.BRANCH_NO;
        console.log(this.builder_detail);
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

  projectChange(event) {
    this.project_selected = event.value;

    let body_get_query_data = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                  <soapenv:Header/>
                                  <soapenv:Body>
                                    <tem:P_Get_Query_Data>
                                        <!--Optional:-->
                                        <tem:I_PROJECT_NO>575029</tem:I_PROJECT_NO>
                                        <!--Optional:-->
                                        <tem:Token>${this.token}</tem:Token>
                                    </tem:P_Get_Query_Data>
                                  </soapenv:Body>
                              </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/P_Get_Query_Data';
    let result_tag = 'P_Get_Query_DataResult';
    this.shared.getData(soapaction, body_get_query_data, result_tag).subscribe(
      (data) => {
        this.query_list = data.Table;
        let count = 0;
        this.query_list.forEach(element => {
          this.getBuilderName(element.CREATED_BY, element.QUERY_TYPE);
        });

        console.log(this.query_list)
      }
    );

  }

  getBuilderName(id, query_type) {

    if (query_type == 'Builder') {
      let body_builders_details = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                    <soapenv:Header/>
                                    <soapenv:Body>
                                      <tem:GetBuilderDetails>
                                          <!--Optional:-->
                                          <tem:BUILDERID>${id}</tem:BUILDERID>
                                          <!--Optional:-->
                                          <tem:Token>${this.token}</tem:Token>
                                      </tem:GetBuilderDetails>
                                    </soapenv:Body>
                                </soapenv:Envelope>`;

      let soapaction = 'http://tempuri.org/IService1/GetBuilderDetails';
      let result_tag = 'GetBuilderDetailsResult';
      this.shared.getData(soapaction, body_builders_details, result_tag).subscribe(
        (data) => {
          let builder_detail = data.Table[0];
          this.builder_names[id] = builder_detail.BUILDER_NAME;
          console.log(builder_detail);
        }
      );

    } else {
      console.log('else',id);

      this.builder_names[id] = id;
    }
  }

  queryData(id, raised_by, query) {
    this.selected_query = query;
    this.raised_by = raised_by;

    let body_query_detail = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                              <soapenv:Header/>
                              <soapenv:Body>
                                <tem:Get_QRY_DTA_BY_QUESTID>
                                    <!--Optional:-->
                                    <tem:I_QUEST_ID>${id}</tem:I_QUEST_ID>
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

  sendResponse() {

    let body_query_detail = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                              <soapenv:Header/>
                              <soapenv:Body>
                                <tem:Insert_Query>
                                    <!--Optional:-->
                                    <tem:PROJECT_ID>${this.selected_query.PROJECT_ID}</tem:PROJECT_ID>
                                    <!--Optional:-->
                                    <tem:PHASE_ID>${this.selected_query.PHASE_ID}</tem:PHASE_ID>
                                    <!--Optional:-->
                                    <tem:PROJECT_NAME>${this.selected_query.PROJECT_NAME}</tem:PROJECT_NAME>
                                    <!--Optional:-->
                                    <tem:QUERY>${this.message}</tem:QUERY>
                                    <!--Optional:-->
                                    <tem:I_QUERY_ID></tem:I_QUERY_ID>
                                    <!--Optional:-->
                                    <tem:STATUS>${this.selected_query.STATUS}</tem:STATUS>
                                    <!--Optional:-->
                                    <tem:I_PARENT_QUEST_ID>${this.selected_query.QUEST_ID}</tem:I_PARENT_QUEST_ID>
                                    <!--Optional:-->
                                    <tem:SUBSTATUS>${this.selected_query.SUBSTATUS}</tem:SUBSTATUS>
                                    <!--Optional:-->
                                    <tem:K1>${this.selected_query.K1}</tem:K1>
                                    <!--Optional:-->
                                    <tem:K2>${this.selected_query.K2}</tem:K2>
                                    <!--Optional:-->
                                    <tem:K3>${this.selected_query.K3}</tem:K3>
                                    <!--Optional:-->
                                    <tem:K4>${this.selected_query.K4}</tem:K4>
                                    <!--Optional:-->
                                    <tem:CREATED_BY>${this.builder_id}</tem:CREATED_BY>
                                    <!--Optional:-->
                                    <tem:UPDATED_BY>${this.builder_id}</tem:UPDATED_BY>
                                    <!--Optional:-->
                                    <tem:Question>${this.message}</tem:Question>
                                    <!--Optional:-->
                                    <tem:I_QUERY_TYPE>Builder</tem:I_QUERY_TYPE>
                                    <!--Optional:-->
                                    <tem:I_URL>${this.selected_query.URL}</tem:I_URL>
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
