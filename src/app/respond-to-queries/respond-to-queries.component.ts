import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { ISoapMethodResponse } from 'ngx-soap';

@Component({
  selector: 'app-respond-to-queries',
  templateUrl: './respond-to-queries.component.html',
  styleUrls: ['./respond-to-queries.component.css']
})
export class RespondToQueriesComponent implements OnInit {
  builders_details: any = [];
  branch_no: any;
  project_list: any;
  query_list: any;
  array_query_type: any = [];
  query_type: any = [];
  builder_query_type: any = [];
  builer_id: any = [];
  new_builders_details: any = [];
  newarray: any = [];

  constructor(private shared: SharedService) { }

  ngOnInit(): void {
    this.shared.headerTitle('Respond To Queries');
    // this.getBuilersDetails()
    this.getQueryList()
    // this.getBuilersDetails1()
  }

  getBuilersDetails(v) {
    let body_builders_details = { BUILDERID: v, Token: 'MH3NPYK34J0KHDI' };
    console.log(body_builders_details)

    setTimeout(() => {

      (<any>this.shared.client).GetBuilderDetails(body_builders_details).subscribe(

        (res: ISoapMethodResponse) => {
          console.log('method response', res);
          let xmlResponse = res.xml;
          let result = res.result.GetBuilderDetailsResult;
          // console.log(result);

          var result_json = JSON.parse(result)
          console.log("object", result_json)


          this.builders_details = result_json.Table
          console.log(this.builders_details)
          this.new_builders_details = this.builders_details.map(e => e.BUILDER_NAME)
          console.log(this.new_builders_details)
          for (var i = 0; i < this.new_builders_details.length; i++) {
            this.newarray = this.new_builders_details[i]
            console.log(this.newarray)
          }
          // this.branch_no = this.builders_details[0].BRANCH_NO;

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
        console.log('method response', res);
        let xmlResponse = res.xml;
        let result = res.result.Get__Pac_Project_ListResult;
        console.log(result);

        var result_json = JSON.parse(result)
        console.log("object", result_json)

        this.project_list = result_json.Table;
      },
      err => console.log(err)
    );


  }

  getQueryList() {
    let body_P_Get_Query_Data = { I_PROJECT_NO: '575029', Token: 'MH3NPYK34J0KHDI' };

    setTimeout(() => {

      (<any>this.shared.client).P_Get_Query_Data(body_P_Get_Query_Data).subscribe(
        (res: ISoapMethodResponse) => {
          console.log('method response', res);
          let xmlResponse = res.xml;
          let result = res.result.P_Get_Query_DataResult;
          console.log(result);

          var result_json = JSON.parse(result)
          console.log("object", result_json)

          this.query_list = result_json.Table;

          console.log(this.query_list)
          for (var i = 0; i < this.query_list.length; i++) {
           

            console.log("query type", this.query_list[i].QUERY_TYPE);

            if (this.query_list[i].QUERY_TYPE == 'Builder') {

              console.log(this.query_list[i].CREATED_BY)

             this.getBuilersDetails(this.query_list[i].CREATED_BY)
              this.query_list = this.query_list.map((bldg) => {
                for (var j = 0; j < this.builders_details.length; j++) {
                  let eObject = Object.assign({}, bldg);

                  eObject.BUILDER_NAME = this.new_builders_details[j];
                  return eObject;

                }
              })
 
            } else {


              this.query_list = this.query_list.map((bldg) => {
                for (var j = 0; j < this.builders_details.length; j++) {
                  let eObject = Object.assign({}, bldg);

                  eObject.BUILDER_NAME = this.query_list[i].CREATED_BY;
                  return eObject;

                }
              })
            }
          }
          // console.log(this.builders_details);
        },
        err => console.log(err)
      );

    }, 1000);

  }

}
