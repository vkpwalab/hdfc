import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import $ from 'jquery';
import { ISoapMethodResponse } from 'ngx-soap';
@Component({
  selector: 'app-dashboard-projects',
  templateUrl: './dashboard-projects.component.html',
  styleUrls: ['./dashboard-projects.component.css']
})
export class DashboardProjectsComponent implements OnInit {
  top_projects: any;

  constructor(private shared : SharedService) { }

  ngOnInit(): void {
    this.getTopProject();
    
  }
  
  getTopProject(){
    let body_top_project = { i_builder_id: '510673', Token: 'MH3NPYK34J0KHDI' };
   
    setTimeout(() => {
      (<any>this.shared.client).View_bldr_top_proj(body_top_project).subscribe(

        (res: ISoapMethodResponse) => {
          console.log('method response', res);
          let xmlResponse = res.xml;
          let result = res.result.View_bldr_top_projResult;

          var result_json = JSON.parse(result)
          console.log("object", result_json)


          this.top_projects = result_json.Table;

          for (let index = 0; index < this.top_projects.length; index++) {
            const element = this.top_projects[index];
            let lead_percent = (element.CONV_LEAD / element.TOTAL_LEAD) * 100;
            let lead_outof10 = Math.round((lead_percent / 100) * 10);
            
            for (let j = 1; j <= 10; j++) {
              if(j <= lead_outof10){
                this.top_projects[index]['u'+j] = true;
              }else{
                this.top_projects[index]['u'+j] = false;
              }
            }
            this.top_projects[index]['disb_percent'] = (element.TOT_SANCTION / element.TOTAL_FUNDING) * 100;

          }

          setTimeout(() => {
            for (let index = 0; index < this.top_projects.length; index++) {
              $('#progress'+index).css('width',this.top_projects[index]['disb_percent']+'%');
            }
          }, 1);
         console.log(this.top_projects);
        },
        err => console.log(err)
      );
    }, 1000);
  }
}
