import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { ISoapMethodResponse } from 'ngx-soap';

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
  builder_names:any = {};
  query_data: any = [];
  raised_by: any = "";
  message:any = '';
  selected_query: any;
  
  constructor(private shared: SharedService) { }

  ngOnInit(): void {
    this.shared.headerTitle('Respond To Queries');
    this.getBuilersDetails();
  }

  getBuilersDetails() {
    let body_builders_details = { BUILDERID: '510673', Token: 'MH3NPYK34J0KHDI' };
    console.log(body_builders_details)

    setTimeout(() => {
      (<any>this.shared.client).GetBuilderDetails(body_builders_details).subscribe(

        (res: ISoapMethodResponse) => {
          let xmlResponse = res.xml;
          let result = res.result.GetBuilderDetailsResult;

          var result_json = JSON.parse(result)

          this.builder_detail = result_json.Table;
          console.log(this.builder_detail);

          this.branch_no = this.builder_detail[0].BRANCH_NO;

          this.getPacProjectList();
        },
        err => console.log(err)
      );
    }, 1000);
  }



  getPacProjectList() {
    let body_Pac_Project_List = { branch: this.branch_no, I_BUILDER_ID: '510673', Token: 'MH3NPYK34J0KHDI' };

    (<any>this.shared.client).Get__Pac_Project_List(body_Pac_Project_List).subscribe(
      (res: ISoapMethodResponse) => {
        let xmlResponse = res.xml;
        let result = res.result.Get__Pac_Project_ListResult;
        var result_json = JSON.parse(result)

        this.project_list = result_json.Table;
      },
      err => console.log(err)
    );


  }

  projectChange(event) {
    this.project_selected = event.value;

    let body_P_Get_Query_Data = { I_PROJECT_NO: '575029', Token: 'MH3NPYK34J0KHDI' };

    (<any>this.shared.client).P_Get_Query_Data(body_P_Get_Query_Data).subscribe(
      (res: ISoapMethodResponse) => {
        let xmlResponse = res.xml;
        let result = res.result.P_Get_Query_DataResult;
        var result_json = JSON.parse(result)

        this.query_list = result_json.Table;

        
        let count = 0;
        this.query_list.forEach(element => {
            this.getBuilderName(element.CREATED_BY,element.QUERY_TYPE);
        });
        
        console.log(this.query_list)
        // console.log(this.builders_details);
      },
      err => console.log(err)
    );

  }

  getBuilderName(id,query_type){

    let body_builders_details = { BUILDERID: id, Token: 'MH3NPYK34J0KHDI' };

    if(query_type == 'Builder'){
      (<any>this.shared.client).GetBuilderDetails(body_builders_details).subscribe(

        (res: ISoapMethodResponse) => {
          let xmlResponse = res.xml;
          let result = res.result.GetBuilderDetailsResult;

          var result_json = JSON.parse(result)

          let builder_detail = result_json.Table;
 
          this.builder_names[id] = builder_detail[0].BUILDER_NAME;
          
        },
        err => console.log(err)
      );
    }else{
      this.builder_names[id] = id;
    }
  }

  queryData(id,raised_by,query){
    this.selected_query = query;
    this.raised_by = raised_by;
    let body_query_detail = { I_QUEST_ID: id, Token: 'MH3NPYK34J0KHDI' };

    (<any>this.shared.client).Get_QRY_DTA_BY_QUESTID(body_query_detail).subscribe(

      (res: ISoapMethodResponse) => {
        let xmlResponse = res.xml;
        let result = res.result.Get_QRY_DTA_BY_QUESTIDResult;

        var result_json = JSON.parse(result)

        this.query_data = result_json.Table;
        console.log(this.query_data);
        
      },
      err => console.log(err)
    );
  }

  sendResponse(){
    let body_insert_query = { 
      PROJECT_ID: this.selected_query.PROJECT_ID, 
      PHASE_ID: this.selected_query.PHASE_ID,
      PROJECT_NAME: this.selected_query.PROJECT_NAME,
      QUERY: this.message,
      I_QUERY_ID: '',
      STATUS: this.selected_query.STATUS,
      I_PARENT_QUEST_ID: this.selected_query.QUEST_ID,
      SUBSTATUS: this.selected_query.SUBSTATUS,
      K1: this.selected_query.K1,
      K2: this.selected_query.K2,
      K3: this.selected_query.K3,
      K4: this.selected_query.K4,
      CREATED_BY: '510673',
      UPDATED_BY: '510673',
      Question: this.message,
      I_QUERY_TYPE: 'Builder',
      I_URL:this.selected_query.URL,
      Token: 'MH3NPYK34J0KHDI' };

    (<any>this.shared.client).Insert_Query(body_insert_query).subscribe(

      (res: ISoapMethodResponse) => {
        let xmlResponse = res.xml;
        let result = res.result.Insert_QueryResult;

        var result_json = JSON.parse(result)

        if(result_json == "Success"){
          alert('Your query is submitted');
        }
        // this.query_data = result_json.Table;
        console.log(result_json);
        
      },
      err => console.log(err)
    );
  }

}
