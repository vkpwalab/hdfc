import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css']
})
export class QueriesComponent implements OnInit {
  @Input() project_id: any;
  token: string;
  query_list: any = [];
  builder_names: any = {};
  @Output() query: EventEmitter<any> = new EventEmitter<any>();
  responded_query: any = [];

  constructor(private shared:SharedService, private http:HttpClient) { }

  ngOnInit(): void {
    this.token = 'MH3NPYK34J0KHDI';
    this.getQueryData();
  }

  getQueryData() {

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
        let count = 0;
        data.Table.forEach(element => {
          this.getBuilderName(element.CREATED_BY, element.QUERY_TYPE);
          if(element.STATUS == "RESPONDED"){
            this.responded_query.push(element);
          }else{
            this.query_list.push(element);
          }
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

        }
      );

    } else {
      this.builder_names[id] = id;
    }
  }

  queryData(name, query){
    query.CREATED_NAME = name;
    this.query.emit(query);
  }
}
