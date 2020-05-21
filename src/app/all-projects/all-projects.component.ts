import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import $ from 'jquery';
import { ISoapMethodResponse } from 'ngx-soap';
import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';





@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {
  builder_details: any = [];
  project_list: any = [];
  branch_no;
  status;
  // searchText: string;
  search_text;
  BUILDER_NAME;

  select_values_of_status: any;
  errMsg: string;
  status_all: string;
  ans: string;
  path: string;
  status_pending: string;
  status_completed: string;
  constructor(private shared: SharedService,private ar:ActivatedRoute) {
    console.log(ar)
  }

  ngOnInit(): void {
    this.selectStatusOption();
    this.getBuilersDetails();
    
    this.shared.headerTitle('List All Projects');
  }

  // goToOverview(){
  //   alert("hi")
  //   console.log(this.ar.snapshot.url)
  //   this.path = this.ar.snapshot.url[0].path
  //   console.log(this.path)
  //   this.shared.myOverview(this.path)

  // }
  showFilter(id) {
    if ($('#filter' + id).is(':visible')) {
      $('#filter' + id).hide();
    } else {
      $('#filter' + id).show();
    }
  }
 
  getBuilersDetails(){
    let body_builders_details = { BUILDERID: '510673', Token: 'MH3NPYK34J0KHDI' };

    setTimeout(() => {
      (<any>this.shared.client).GetBuilderDetails(body_builders_details).subscribe(

        (res: ISoapMethodResponse) => {
          console.log('method response', res);
          let xmlResponse = res.xml;
          let result = res.result.GetBuilderDetailsResult;
          console.log(result);

          var result_json = JSON.parse(result)
          console.log("object", result_json)


          this.builder_details = result_json.Table;

          this.branch_no = this.builder_details[0].BRANCH_NO;

          this.getPacProjectList();
        },
        err => console.log(err)
      );
    }, 100);
  }
  getPacProjectList(){
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

          for (var i = 0; i < this.project_list.length; i++) {
            this.status = this.project_list[i].PROJECT_STAUS;
            console.log("status", this.status);

          }
        },
        err => console.log(err)
      );
   

  }
  selectStatusOption() {
    console.log(this.select_values_of_status)
   this.status_all =  this.select_values_of_status = 'All';
  //  this.status_pending = this.select_values_of_status = 'Pending';
  //  this.status_completed = this.select_values_of_status = 'Completed';

  }

  }


