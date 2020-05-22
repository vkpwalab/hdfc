import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { SharedService } from '../services/shared.service';
import { ISoapMethodResponse } from 'ngx-soap';
import { ActivatedRoute } from '@angular/router';

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
  path: string;
  event_value: any;
  p_name: any;
  project_name: any = [];
  select_values_of_project: any;
  constructor(private shared: SharedService,private ar:ActivatedRoute) {
    // this.show_progress=false;
   }

  ngOnInit(): void {
    this.shared.headerTitle('Project Progress');

    this.getBuilersDetails();
  }
   showProgress(id){
     if($('#progress'+id).is(':visible')){
       $('#progress'+id).hide();
     }else{
      $('#progress'+id).show();
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

  getPacProjectList(){
    let body_Pac_Project_List = { branch: this.branch_no, I_BUILDER_ID: '510673', Token: 'MH3NPYK34J0KHDI' };

    (<any>this.shared.client).Get__Pac_Project_List(body_Pac_Project_List).subscribe(
      (res: ISoapMethodResponse) => {
        console.log('method response', res);
        let xmlResponse = res.xml;
        let result = res.result.Get__Pac_Project_ListResult;

        var result_json = JSON.parse(result)

        this.project_list = result_json.Table;

        console.log(this.project_list);

      },
      err => console.log(err)
    );

  }

  
  projectChange(event){
   
    this.event_value = event.value
    console.log(this.event_value);

    let body_Building_List = { i_project_no: this.event_value, Token: 'MH3NPYK34J0KHDI' };

    (<any>this.shared.client).get_project_building(body_Building_List).subscribe(
      (res: ISoapMethodResponse) => {
        console.log('method response', res);
        let xmlResponse = res.xml;
        let result = res.result.get_project_buildingResult;

        var result_json = JSON.parse(result)

        this.building_list = result_json.Table;

        console.log(this.building_list);
      //  this.getPacProjectList()

      let project_name = this.project_list.filter(p=> p.PROJECTID == this.event_value )

      console.log(project_name);

      this.building_list = this.building_list.map((bldg)=>{
        let eObject = Object.assign({}, bldg);
        eObject.project_name = project_name[0].PROJECT_NAME;
        return eObject;
      })

      console.log(this.building_list);

      },
      err => console.log(err)
    );
  }
}
