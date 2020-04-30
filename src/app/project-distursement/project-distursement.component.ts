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
  build_no;
  status: void;
  id :number;
  name :string;
  project_names: any=[];
  buildingname : any=[];
  constructor(private shared : SharedService) { }

  ngOnInit(): void {
    this.shared.headerTitle('Project Disbursement');
    let body = { BUILDERID: '510673', Token: 'MH3NPYK34J0KHDI' };
    let body1 = { branch: 'this.build_no', I_BUILDER_ID: '510673', Token: 'MH3NPYK34J0KHDI'};
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
        
        for(var i=0;i<this.object1.length;i++)

        {
          let single_obj = {'name':this.object1[i].PROJECT_NAME, 'value': this.object1[i].PROJECTID};
          this.project_names.push(single_obj)
        
        }
    
        },
        err => console.log(err)
      );
    }, 4000);
  }

}
