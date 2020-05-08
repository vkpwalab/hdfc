import { Component, OnInit, ɵConsole } from '@angular/core';
import { SharedService } from '../services/shared.service';
import $ from 'jquery';
import { ISoapMethodResponse } from 'ngx-soap';
import { Pipe, PipeTransform } from '@angular/core';




@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {
  object_body_builders_details: any = [];
  object_Pac_Project_List: any = [];
  build_no;
  status;
  // searchText: string;
  search_text;
  BUILDER_NAME;

  select_values_of_status: any;
  errMsg: string;
  constructor(private shared: SharedService) {

  }

  ngOnInit(): void {
    this.selectStatusOption();
    this.getBuilersDetails();
    this.getPacProjectList();
    this.shared.headerTitle('List All Projects');
  }


  showFilter(id) {
    if ($('#filter' + id).is(':visible')) {
      $('#filter' + id).hide();
    } else {
      $('#filter' + id).show();
    }
  }
  selectStatusOption() {
    console.log(this.select_values_of_status)
  }

  getBuilersDetails(){
    let body_builders_details = { BUILDERID: '510673', Token: 'MH3NPYK34J0KHDI' };

    setTimeout(() => {
      (<any>this.shared.client).GetBuilderDetails(body_builders_details).subscribe(

        (res: ISoapMethodResponse) => {
          console.log('method response', res);
          let xmlResponse = res.xml;
          let message_get_builder_details = res.result.GetBuilderDetailsResult;
          console.log(message_get_builder_details);

          var obj = JSON.parse(message_get_builder_details)
          console.log("object", obj)


          this.object_body_builders_details = obj.Table;

          for (var i = 0; i < this.object_body_builders_details.length; i++) {
            this.build_no = this.object_body_builders_details[i].BRANCH_NO;
            console.log("buildname", this.build_no);

          }
        },
        err => console.log(err)
      );
    }, 100);
  }
  getPacProjectList(){
    let body_Pac_Project_List = { branch: 'this.build_no', I_BUILDER_ID: '510673', Token: 'MH3NPYK34J0KHDI' };

    setTimeout(() => {
      (<any>this.shared.client).Get__Pac_Project_List(body_Pac_Project_List).subscribe(
        (res: ISoapMethodResponse) => {
          console.log('method response', res);
          let xmlResponse = res.xml;
          let message_get_pac_project_list = res.result.Get__Pac_Project_ListResult;
          console.log(message_get_pac_project_list);

          var obj1 = JSON.parse(message_get_pac_project_list)
          console.log("object", obj1)

          this.object_Pac_Project_List = obj1.Table;

          for (var i = 0; i < this.object_Pac_Project_List.length; i++) {
            this.status = this.object_Pac_Project_List[i].PROJECT_STAUS;
            console.log("status", this.status);

          }
        },
        err => console.log(err)
      );
    }, 100);

  }
  }


