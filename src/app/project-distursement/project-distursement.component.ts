import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { ISoapMethodResponse } from 'ngx-soap';
@Component({
  selector: 'app-project-distursement',
  templateUrl: './project-distursement.component.html',
  styleUrls: ['./project-distursement.component.css']
})
export class ProjectDistursementComponent implements OnInit {
  object:any=[];
  object1:any[];
  object2:any[];
  build_no;
  status: void;
  id :number;
  name :string;
  project_names: any=[];
  building_names: any=[];
  selected_project_value: any;
  constructor(private shared : SharedService) { }

  ngOnInit(): void {
    this.shared.headerTitle('Project Disbursement');
    this.projectNameChange()
    // let body = { BUILDERID: '510673', Token: 'MH3NPYK34J0KHDI' };
    let body1 = {I_BUILDER_ID: '510673', Token: 'MH3NPYK34J0KHDI'};
    console.log(body1);
     
    // setTimeout(() => {
    //   (<any>this.shared.client).GetBuilderDetails(body).subscribe(
    //     (res: ISoapMethodResponse) => {
    //       console.log('method response', res);
    //       let xmlResponse = res.xml;
    //       let message = res.result.GetBuilderDetailsResult;
    //       console.log(message);

    //       var obj = JSON.parse(message)
    //       console.log("object", obj)
          
        //  for(var ans in obj){
        //     console.log(obj[ans])
        //     console.log(obj[ans].BUILDER_NAME)

        //  }
      
    //     this.object = obj.Table;
        
    //     for(var i=0;i<this.object.length;i++)
    //     {
    //       this.build_no = this.object[i].BRANCH_NO;
    //       console.log("buildname",this.build_no);

    //     }



    //     },
    //     err => console.log(err)
    //   );
    // }, 4000);

    setTimeout(() => {
      (<any>this.shared.client).Get__Pac_Project_List(body1).subscribe(
        (res: ISoapMethodResponse) => {
          console.log('method response', res);
          let xmlResponse = res.xml;
          let message1 = res.result.Get__Pac_Project_ListResult;
          console.log(message1);

          var obj1 = JSON.parse(message1)
          console.log("object", obj1)
          
        this.object1 = obj1.Table;
        
        // for(var i=0;i<this.object1.length;i++)

        // {
        //   let single_obj = {'name':this.object1[i].PROJECT_NAME, 'value': this.object1[i].PROJECTID};
        //   this.project_names.push(single_obj)
        
        // }
    
        },
        err => console.log(err)
      );
    }, 4000);


  }
  // projectNameChange(){
  // alert(this.selected_project_value)
  // }
  projectNameChange(){
    console.log(this.selected_project_value)
    setTimeout(() => {
      let body2 = { i_project_no: this.selected_project_value, Token: 'MH3NPYK34J0KHDI'};
      (<any>this.shared.client).get_project_building(body2).subscribe(
        (res: ISoapMethodResponse) => {
          console.log('method response', res);
          let xmlResponse = res.xml;
          let message2 = res.result.get_project_buildingResult;
          console.log(message2);

          var obj2 = JSON.parse(message2)
          console.log("object", obj2)
          
        this.object2 = obj2.Table;
        
        
        for(var i=0;i<this.object2.length;i++)

        {
          let double_obj = {'name':this.object2[i].BLDG_NAME, 'value': this.object2[i].PROJ_BLDG_NO};
          this.building_names.push(double_obj);
          // this.selected_project_value.push(double_obj)
        
        }
    
        },
        err => console.log(err)
      );
    }, 4000);
  }
}
